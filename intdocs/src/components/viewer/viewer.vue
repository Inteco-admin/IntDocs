<template>
  <div id="viewer" class="fit"></div>
</template>

<script>
import { ref, isProxy, toRaw } from "vue";
import api from "../../services/api";

export default {
  /*props: {
      file_id: {
        type: String,
      },
    },*/
  props: ["file_id", "issues"],

  async mounted() {
    const file_path = await api
      .get(`resource/File/${this.file_id}`)
      .then((res) => res.data.data.file_url);

    console.log(file_path);

    const options = {
      env: "Local",
      useADP: false,
      document: "http://vm-srv-bimbom" + file_path,
    };
    var _mapping = {};
    Autodesk.Viewing.theExtensionManager.registerExternalExtension(
      "IssuesExtension",
      "extenson.js"
    );
    Autodesk.Viewing.Private.DISABLE_FORGE_LOGO = false;
    Autodesk.Viewing.Private.ENABLE_DEBUG = false;
    Autodesk.Viewing.Initializer(options, () => {
      var viewer = new Autodesk.Viewing.GuiViewer3D(
        document.getElementById("viewer"),
        { extensions: ["IssuesExtension"] }
      );
      viewer.file_id = this.file_id;
      console.log("[viewer.vue] Viewer instance: ", viewer);
      viewer.start();
      viewer.loadModel(
        options.document,
        {},
        onDocumentLoadSuccess,
        onDocumentLoadFailure
      );

      let issues = this.issues;
      // console.log(issues);

      this.emitter.on("issue-added", () => {
        issues = this.issues;
      });

      function onDocumentLoadSuccess(doc) {
        console.log("[viewer.vue] doc", doc);
        var models = viewer.impl.modelQueue().getModels();
        var model = models[0];
        console.log("[viewer.vue] model", model);
        var bubble = model.loader.options.bubbleNode;
        var rootNode = bubble.getRootNode();
        rootNode.getDocument();
        var currentPage = viewer.impl.layers.model.myData.metadata.currentPage;
        console.log(
          "[viewer.vue] ! -- load first pushpins for page:",
          currentPage
        );
        _loadPushpins(viewer, issues, currentPage);
        var geometries = rootNode.search({ type: "geometry" });

        for (var i = 0, len = geometries.length; i < len; ++i) {
          var bubbleNode = geometries[i];
          var _guid = bubbleNode.guid();
          if (!_guid) continue;

          var thumbnail = _createThumbnail(bubbleNode, viewer);
          var _document = viewer.getDocument();
          var _window = viewer.getWindow();
          var _container = _document.createElement("div");
          _container.style["text-align"] = "center";
          _container.appendChild(thumbnail);
          this._pendingImage = [];
          _mapping[_guid] = {
            bubbleNode: bubbleNode,
            div: thumbnail,
          };
          //_container.addEventListener('click', function(evt){console.log(evt)})
        }

        var wrapp = document.getElementById("pdf-pages-wrapper");
        for (let [k, v] of Object.entries(_mapping)) {
          if (v.bubbleNode["data"]["page"] == currentPage) {
            console.log("[viewer.vue] equal page", v);
            v.div.classList.add("active");
            wrapp.appendChild(v.div);
          } else {
            wrapp.appendChild(v.div);
          }
        }

        var divs = document.querySelectorAll(
          ".viewer-ext-docbrowser-thumbnail"
        );

        viewer.addEventListener(Autodesk.Viewing.MODEL_UNLOADED_EVENT, (x) => {
          console.log("[viewer.vue] MODEL_UNLOADED_EVENT");
          document
            .querySelectorAll("div[id^='mymk']")
            .forEach((e) => e.remove());
        });

        divs.forEach(function (elm) {
          elm.addEventListener("click", function (evt) {
            var target = evt.target;
            if (!target.getAttribute("bubble-guid")) {
              var parent = target.parentElement;
              console.log("[viewer.vue] ", parent.getAttribute("bubble-guid"));
              var guid = parent.getAttribute("bubble-guid");
              let elm = document.querySelectorAll(
                ".viewer-ext-docbrowser-thumbnail.active"
              );
              elm.forEach(function (d) {
                d.classList.remove("active");
              });
              let elm_active = document.querySelectorAll(
                '.viewer-ext-docbrowser-thumbnail[bubble-guid="' + guid + '"]'
              );
              if (elm_active.length === 1) {
                elm_active[0].classList.add("active");
              }
              viewer
                .loadDocumentNode(
                  rootNode.getDocument(),
                  _mapping[guid].bubbleNode
                )
                .then(function () {
                  var currentPage =
                    viewer.impl.layers.model.myData.metadata.currentPage;
                  console.log(
                    "%c [viewer.vue] ! -- load pushpins for page: " +
                      currentPage,
                    "background: #222; color: #bada55"
                  );
                  _loadPushpins(viewer, issues, currentPage);
                });
            }
          });
        });

        return;
      }

      function onDocumentLoadFailure() {
        console.log("[viewer.vue] Error!");
        return;
      }
    });

    async function _loadPushpins(viewer, issues, page) {
      const all = JSON.parse(JSON.stringify(issues));
      if (!page) var page = 1;
      if (viewer.getExtension("IssuesExtension")) {
        var ext = viewer.getExtension("IssuesExtension");

        // let allissues = [];

        console.log("[viewer.vue] _loadPushpins Issues: ", all);

        for (let index = 0; index < all.length; index++) {
          const element = all[index];
          console.log("in", element["pdfpage"]);
          if (element["pdfpage"] == page) {
            console.log("Found Issue: ", element);
            ext._drawPushpin2(
              JSON.parse(element["pdfcoords"]),
              JSON.parse(element["pdfcamera"]),
              element["workflow_state"],
              {
                pdfcoords: JSON.parse(element["pdfcoords"]),
                pdfcamera: JSON.parse(element["pdfcamera"]),
                state: element["workflow_state"],
                name: element["name"],
              }
            );
          }
        }

        // } else {
        //   console.warn("WTF!");
        // }
      }
    }

    function _createThumbnail(bubbleNode, viewer) {
      let THUMBNAIL_SIZE = 200;
      let avp = Autodesk.Viewing.Private;
      var _document = viewer.getDocument();
      // container
      var div = _document.createElement("div");
      div.classList.add("viewer-ext-docbrowser-thumbnail");
      div.setAttribute("bubble-guid", bubbleNode.guid());
      //div.style.width = THUMBNAIL_SIZE + 'px';
      //div.style.height = THUMBNAIL_SIZE + 'px';

      // loading spinner
      var img = _document.createElement("img");
      Autodesk.Viewing.Thumbnails.getUrlForBubbleNode(bubbleNode).then(
        function (srcUrl) {
          //console.log(JSON.stringify(srcUrl))
          //img.src = avp.getResourceUrl('res/ui/spinner.png');
          img.src = srcUrl;
          //img.classList.add('viewer-ext-docbrowser-thumbnail-spinner');
          div.appendChild(img);
        }
      );

      // label
      var label = _document.createElement("div");
      label.innerText = bubbleNode.name();
      label.classList.add("viewer-ext-docbrowser-thumbnail-label");
      div.appendChild(label);
      return div;
    }

    this.emitter.on("issue-show-click", (e) => {
      console.log("[viewer.vue] emitter issue-show", e);
      //var viewer = NOP_VIEWER;
      if (NOP_VIEWER.getExtension("IssuesExtension")) {
        var ext = NOP_VIEWER.getExtension("IssuesExtension");
        var needPage = e.pdfpage;
        console.warn(
          "[viewer.vue] -- impl.layers.model",
          NOP_VIEWER.impl.layers.model
        );
        var currentPage =
          NOP_VIEWER.impl.layers.model.myData.metadata.currentPage;
        console.log(
          "[viewer.vue] currentPage: ",
          currentPage,
          " needPage: ",
          needPage
        );
        if (needPage != currentPage) {
          for (let [k, v] of Object.entries(_mapping)) {
            if (needPage == v.bubbleNode["data"]["page"]) {
              //console.log('[viewer.vue] -- Need page:', needPage, '-- Bubble page:', v.bubbleNode['data']['page'])
              console.log("[viewer.vue] change page", v.bubbleNode);
              var models = NOP_VIEWER.impl.modelQueue().getModels();
              var model = models[0];
              console.log("[viewer.vue] model", model);
              var bubble = model.loader.options.bubbleNode;
              var rootNode = bubble.getRootNode();
              console.log("[viewer.vue]", rootNode);
              NOP_VIEWER.loadDocumentNode(
                rootNode.getDocument(),
                v.bubbleNode
              ).then(() => {
                var currentPage =
                  NOP_VIEWER.impl.layers.model.myData.metadata.currentPage;
                console.log(
                  "%c [viewer.vue] ! -- load pushpins for page: " + currentPage,
                  "background: #277; color: #bada55"
                );
                _loadPushpins(NOP_VIEWER, this.issues, currentPage).then(
                  ext._divRestore(JSON.parse(e.pdfcamera))
                );
              });
              break;
            } else if (needPage == currentPage) {
              console.log("[viewer.vue] Same page! Nothing to do");
              break;
            }
          }
        } else {
          ext._divRestore(JSON.parse(e.pdfcamera));
        }
      }
    });
  },

  unmounted() {
    NOP_VIEWER.finish();
    Autodesk.Viewing.shutdown();
  },

  methods: {
    getClass(state) {
      switch (state) {
        case "Draft":
          return "bg-draft text-white";
        case "Approved":
          return "bg-approved text-white";
        case "Submited":
          return "bg-submited text-white";
        case "Pending":
          return "bg-pending text-white";

        default:
          return "bg-gray-200 text-white";
      }
    },
  },
};
</script>
<style scoped>
@import "https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.min.css";
</style>
