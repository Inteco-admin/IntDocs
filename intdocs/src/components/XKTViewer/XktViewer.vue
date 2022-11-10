<template>
  <canvas id="myCanvas"></canvas>
</template>

<script>
import Init from "./xeohelper";
export default {
  props: {
    issues: Array,
  },
  emits: [
    'element-picked',
    'element-nothing'
  ],
  data() {
    return {
      viewer: null,
    };
  },
  beforeUnmount() {
    this.emitter.off("issue-show", (issue) => console.log(issue));
  },
  async mounted() {
    this.viewer = await Init("http://vm-srv-bimbom/files/model_kr_vr4.xkt");

    window.viewer = this.viewer;
    this.renderIssues()
    this.viewer.cameraFlight.flyTo({ fitFOV: 50 });

    this.emitter.on("issue-show", (issue) => {
      console.log(this.viewer.scene.objects[issue.modelid]);
      let entity = this.viewer.scene.objects[issue.modelid].meshes[0];
      let solid = this.viewer.scene.objects[issue.modelid].aabb;
      this.viewer.cameraFlight.flyTo(solid);
      // console.log(entity.origin);
      this.viewer.scene.camera.look = [
        (solid[0] + solid[3]) / 2,
        (solid[1] + solid[4]) / 2,
        (solid[2] + solid[5]) / 2,
      ];
      // this.viewer.scene.camera.up = entity.origin;
      // this.viewer.scene.camera.eye = entity.origin;
    });

    // colorize issue

    // this.renderIssues();

    var lastEntity = null;
    var lastColorize = null;

    viewer.cameraControl.on("picked", (pickResult) => {
      if (!pickResult.entity) {
        return;
      }

      // console.log(pickResult.entity.id);

      if (!lastEntity || pickResult.entity.id !== lastEntity.id) {
        if (lastEntity) {
          lastEntity.colorize = lastColorize;
        }

        lastEntity = pickResult.entity;
        lastColorize = pickResult.entity.colorize
          ? pickResult.entity.colorize.slice()
          : null;

        pickResult.entity.colorize = [0.0, 1.0, 0.0];
        this.$emit('element-picked', pickResult.entity.id)
      }
    });

    viewer.cameraControl.on("pickedNothing", () => {
      if (lastEntity) {
        lastEntity.colorize = lastColorize;
        lastEntity = null;
      }
      this.$emit('element-nothing')
    });
  },

  methods: {
    renderIssues() {
      this.issues.forEach(
        (x) =>
        (this.viewer.scene.objects[x.modelid].colorize = [
          0.0, 1.0, 0.0,
        ])
      );
    },
  },
  watch: {
    issues(newValue) {
      if (newValue.length > 0 && this.viewer) {
        this.renderIssues()
      }
    }
  }
};
</script>

<style scoped>
body {
  margin: 0;
  width: 100%;
  height: 100%;
  user-select: none;
}

#myCanvas {
  width: 100%;
  height: 100%;
  position: absolute;
  background: lightblue;
  background-image: linear-gradient(lightblue, white);
}
</style>