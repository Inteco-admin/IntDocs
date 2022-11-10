class IssuesExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
    this._group = null;
    this._button = null;
  }

  load() {
    console.log('IssuesExtension has been loaded');
    var _viewer = this.viewer;
    this.viewer.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, function ext_cam_change(rt) {

      //find out all pushpin markups
      var $eles = $("div[id^='mymk']");

      var DOMeles = $eles.get();

      for (var index in DOMeles) {

        //get each DOM element
        var DOMEle = DOMeles[index];
        var divEle = $('#' + DOMEle.id);
        //get out the 3D coordination
        var val = divEle[0].dataset['3ddata'];
        var pushpinModelPt = JSON.parse(val);
        //get the updated screen point
        var screenpoint = _viewer.worldToClient(new THREE.Vector3(
          pushpinModelPt.x,
          pushpinModelPt.y,
          pushpinModelPt.z));
        divEle.css({
          'left': screenpoint.x - pushpinModelPt.radius,
          'top': screenpoint.y - pushpinModelPt.radius
        });

      }
    });
    return true;
  }

  unload() {
    // Clean our UI elements if we added any
    if (this._group) {
      this._group.removeControl(this._button);
      if (this._group.getNumberOfControls() === 0) {
        this.viewer.toolbar.removeControl(this._group);
      }
    }
    console.log('IssuesExtension has been unloaded');
    return true;
  }

  onToolbarCreated() {

    // Create a new toolbar group if it doesn't exist
    this._group = this.viewer.toolbar.getControl('allIssuesExtensionToolbar');
    if (!this._group) {
      this._group = new Autodesk.Viewing.UI.ControlGroup('allIssuesExtensionToolbar');
      this.viewer.toolbar.addControl(this._group);
    }

    // Add a new button to the toolbar group
    this._button = new Autodesk.Viewing.UI.Button('IssuesExtensionButton');
    this._button.onClick = (ev) => {
      // Execute an action here
      if (this._button.getState()) {
        // if INACTIVE
        var message = {
          messageKey: "",
          messageDefaultValue: "Укажите точку на листе",
          position: "top"
        };

        Autodesk.Viewing.Private.HudMessage.displayMessage(this.viewer.container, message);
        this._button.setState(Autodesk.Viewing.UI.Button.State.ACTIVE);
        this.issueInit(this._button)
      } else {
        // if ACTIVE
        Autodesk.Viewing.Private.HudMessage.dismiss()
        this._button.setState(Autodesk.Viewing.UI.Button.State.INACTIVE);
        $(viewer.container).unbind("click");
      }
    };
    this._button.setToolTip('Add Issue');
    //this._button.addClass('IssuesExtensionIcon');
    this._button.setIcon('adsk-icon-zoom');
    //this._button.icon.classList.add("fas", "fa-arrows-alt");
    this._group.addControl(this._button);
  }

  issueInit(buttonObj) {
    var self = this;
    $(this.viewer.container).one("click", function (event) {
      if (!event.altKey) {
        console.log(event)
        self._onMouseClick(event)
        Autodesk.Viewing.Private.HudMessage.dismiss()
        buttonObj.setState(Autodesk.Viewing.UI.Button.State.INACTIVE);
      } else {
        Autodesk.Viewing.Private.HudMessage.dismiss()
        buttonObj.setState(Autodesk.Viewing.UI.Button.State.INACTIVE);
      }
    });
  }

  _makeid() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  _drawPushpin(pushpinModelPt) {
    //convert 3D position to 2D screen coordination
    var screenpoint = this.viewer.worldToClient(
      new THREE.Vector3(pushpinModelPt.x,
        pushpinModelPt.y,
        pushpinModelPt.z)
    );

    //build the div container
    var randomId = this._makeid();
    var htmlMarker = '<div id="mymk' + randomId + '"></div>';
    var parent = this.viewer.container
    $(parent).append(htmlMarker);
    $('#mymk' + randomId).css({
      'pointer-events': 'none',
      'width': '20px',
      'height': '20px',
      'position': 'absolute',
      'overflow': 'visible',
      // nosvg

      'pointer-events': 'visiblePainted',
      'background-color': 'orange',
      'border': '1px solid black',
      'border-radius': '50%',
      'filter': 'drop-shadow( 2px 2px 4px rgba(0, 0, 0, 0.7))'
      // --nosvg*/
    });
    var self = this;
    document.getElementById('mymk' + randomId).onclick = function () {
      //console.log(this);
      //var el = document.getElementById('mymk'+randomId);
      self._divClick(this);
    }

    var rad = 10;
    //adjust to make the circle center is the position of the click point*/
    var $container = $('#mymk' + randomId);
    $container.css({
      'left': screenpoint.x - rad,
      'top': screenpoint.y - rad
    });

    //store 3D point data to the DOM
    var div = $('#mymk' + randomId);
    //add radius info with the 3D data
    pushpinModelPt.radius = rad;
    let storeData = JSON.stringify(pushpinModelPt);
    let elm = div.get(0)
    let viewState = this.viewer.getState({ viewport: true })
    let pageNumber = this.viewer.impl.layers.model.myData.metadata.currentPage
    let file_id = this.viewer.file_id
    elm.setAttribute('data-viewstate', JSON.stringify(viewState))
    elm.setAttribute('data-3DData', storeData)
    div.data('3DData', storeData);
    elm.classList.add('bg-draft');
    emitter.emit('createIssue', { 'data-3DData': storeData, 'data-viewstate': JSON.stringify(viewState), 'data-pdfpage': pageNumber, 'divid': 'mymk' + randomId, 'file_id': file_id })
  }

  _drawPushpin2(pushpinModelPt, pushpinViewstate, pushpinState, pushpin) {
    //convert 3D position to 2D screen coordination
    var screenpoint = this.viewer.worldToClient(
      new THREE.Vector3(pushpinModelPt.x,
        pushpinModelPt.y,
        pushpinModelPt.z)
    );

    //build the div container
    var randomId = this._makeid();
    var htmlMarker = '<div id="mymk' + randomId + '"></div>';
    var htmlMarkerInside = '<div style="background-color: saddlebrown;white-space: nowrap;top: -25px;position: relative;padding: 0px 5px;"># ' + pushpin.name + '</div>';
    var parent = this.viewer.container
    $(parent).append(htmlMarker);
    $('#mymk' + randomId).css({
      'pointer-events': 'none',
      'width': '20px',
      'height': '20px',
      'position': 'absolute',
      'overflow': 'visible',
      'display': 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      // nosvg

      'pointer-events': 'visiblePainted',
      //'background-color': 'orange',
      'border': '1px solid black',
      'border-radius': '50%',
      'filter': 'drop-shadow( 2px 2px 4px rgba(0, 0, 0, 0.7))'
      // --nosvg*/
    });
    var self = this;
    document.getElementById('mymk' + randomId).onclick = function () {
      //console.log(this);
      //var el = document.getElementById('mymk'+randomId);
      self._divClick(this);
    }

    var rad = 10;
    //adjust to make the circle center is the position of the click point*/
    var $container = $('#mymk' + randomId);
    $container.css({
      'left': screenpoint.x - rad,
      'top': screenpoint.y - rad
    });

    //store 3D point data to the DOM
    var div = $('#mymk' + randomId);
    $(div).append(htmlMarkerInside);
    //add radius info with the 3D data
    pushpinModelPt.radius = rad;
    let storeData = JSON.stringify(pushpinModelPt);
    let elm = div.get(0)
    let viewState = pushpinViewstate;
    let pageNumber = this.viewer.impl.layers.model.myData.metadata.currentPage
    let file_id = this.viewer.file_id
    elm.setAttribute('data-viewstate', JSON.stringify(viewState))
    elm.setAttribute('data-3DData', storeData)
    elm.classList.add(this.getBgColor(pushpinState));
    div.data('3DData', storeData);
  }

  getBgColor(status_name) {
    console.log(status_name)
    switch (status_name.toLowerCase()) {
      case "open":
        return "bg-open";
      case "in disput":
        return "bg-indispute";
      case "submited":
        return "bg-submited";
      case "pending":
        return "bg-pending";
      case "in work":
        return "bg-inwork";
      case "ready to inspect":
        return "bg-ready";
      case "not approved":
        return "bg-notapproved";

      default:
        return "bg-gray-200";
    }
  }

  _onMouseClick(event) {

    let screenPoint = {
      x: event.clientX,
      y: event.clientY
    };
    console.log('screenPoint', screenPoint);

    let viewer_pos = this.viewer.container.getBoundingClientRect();
    console.log('viewer_pos', viewer_pos);
    let hitTest = this.viewer.impl.hitTest(screenPoint.x - viewer_pos.x, screenPoint.y - viewer_pos.y, false);
    console.log('hitTest', hitTest);

    if (hitTest) {
      this._drawPushpin({
        x: hitTest.intersectPoint.x,
        y: hitTest.intersectPoint.y,
        z: hitTest.intersectPoint.z
      });
    } else {
      let mouseHit = this.viewer.impl.clientToWorld(screenPoint.x - viewer_pos.x, screenPoint.y - viewer_pos.y, true);
      console.log('mouseHit', mouseHit);

      if (mouseHit) {
        this._drawPushpin({
          x: mouseHit.point.x,
          y: mouseHit.point.y,
          z: mouseHit.point.z
        });
      }
    }
  }

  _divClick(elm) {
    console.log(JSON.parse(elm.dataset['viewstate']));
    var viewstate = JSON.parse(elm.dataset['viewstate'])
    this.viewer.restoreState(viewstate)
  }

  _divRestore(viewstate) {
    this.viewer.restoreState(viewstate)
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension('IssuesExtension', IssuesExtension);
