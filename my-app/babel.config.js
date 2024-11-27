module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // Confirma que o JSX/TSX está sendo tratado pelo Babel
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      "react-native-reanimated/plugin", // Plugin necessário para o reanimated
    ],
    overrides: [
      {
        test: /\.tsx?$/, // Arquivos TSX e TS
        presets: [
          // Adiciona suporte para TSX especificamente
          ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        ],
      },
    ],
  };
};
