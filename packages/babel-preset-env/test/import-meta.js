import env from "../lib/index.js";
import * as babel from "@babel/core";
import { itNoESM } from "$repo-utils";

const itBabel7NoESM = process.env.BABEL_8_BREAKING ? it.skip : itNoESM;

describe("preset-env", () => {
  function extractParserOptions(api, { ref }) {
    return {
      manipulateOptions(opts, parserOpts) {
        ref.parserOpts = parserOpts;
      },
      visitor: {},
    };
  }

  it("empty test", () => {});

  itBabel7NoESM(
    "should enable the 'importMeta' parser plugin for old parser versions",
    () => {
      const ref = {};
      babel.transformSync("", {
        configFile: false,
        presets: [env],
        plugins: [[extractParserOptions, { ref }]],
        caller: {
          name: "test",
        },
      });

      expect(ref.parserOpts.plugins).toContain("importMeta");
    },
  );
});
