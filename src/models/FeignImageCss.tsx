export function buildFeignImageCss(): string {

  const data = [
    ":root {",
    // Color conversions
    '  --f-white: invert(100%);',  // white
    '  --f-salmon: invert(78%) sepia(54%) saturate(5359%) hue-rotate(344deg) brightness(101%) contrast(101%);', // salmon
    '  --f-purple: invert(25%) sepia(37%) saturate(2322%) hue-rotate(253deg) brightness(88%) contrast(91%);',  // purple
    '  --f-green: invert(38%) sepia(76%) saturate(4631%) hue-rotate(76deg) brightness(86%) contrast(91%);', // green
    '  --f-blue: invert(46%) sepia(92%) saturate(1907%) hue-rotate(203deg) brightness(89%) contrast(88%);',  // blue
    '  --f-red: invert(8%) sepia(93%) saturate(5456%) hue-rotate(352deg) brightness(98%) contrast(106%);',  // red
    '  --f-yellow: invert(98%) sepia(91%) saturate(3846%) hue-rotate(318deg) brightness(113%) contrast(102%);',  // yellow
    '  --f-lime: invert(79%) sepia(54%) saturate(557%) hue-rotate(45deg) brightness(100%) contrast(106%);', // lime
    '  --f-sky: invert(80%) sepia(82%) saturate(431%) hue-rotate(102deg) brightness(86%) contrast(88%);', // sky
    '  --f-pink: invert(60%) sepia(21%) saturate(996%) hue-rotate(295deg) brightness(112%) contrast(101%);', // pink
    '  --f-brown: invert(25%) sepia(24%) saturate(1226%) hue-rotate(348deg) brightness(97%) contrast(89%);', // brown
    '  --f-rose: invert(19%) sepia(65%) saturate(4987%) hue-rotate(300deg) brightness(106%) contrast(125%);', // rose
    '  --f-orange: invert(30%) sepia(99%) saturate(2314%) hue-rotate(357deg) brightness(100%) contrast(101%);', // orange
    '  --f-default: invert(100%) brightness(75%);', // unknown
    '  --d-white: invert(72%) sepia(0%) saturate(4%) hue-rotate(135deg) brightness(99%) contrast(87%);', // white dark #afafaf
    '  --d-salmon: invert(27%) sepia(99%) saturate(1544%) hue-rotate(20deg) brightness(101%) contrast(86%);', // salmon dark #af5c12
    '  --d-purple: invert(16%) sepia(40%) saturate(2136%) hue-rotate(252deg) brightness(90%) contrast(96%);', // purple dark #4b215f
    '  --d-green: invert(22%) sepia(21%) saturate(3064%) hue-rotate(68deg) brightness(101%) contrast(95%);', // green dark  #1a5206
    '  --d-blue: invert(21%) sepia(85%) saturate(1087%) hue-rotate(204deg) brightness(96%) contrast(85%);', // blue dark #334b93
    '  --d-red: invert(9%) sepia(86%) saturate(6697%) hue-rotate(352deg) brightness(56%) contrast(106%);', // red dark #7b0006
    '  --d-yellow: invert(67%) sepia(25%) saturate(1031%) hue-rotate(14deg) brightness(88%) contrast(84%);', // yellow dark #af9d36
    '  --d-lime: invert(50%) sepia(94%) saturate(368%) hue-rotate(56deg) brightness(97%) contrast(88%);', // lime dark #59af2e
    '  --d-sky: invert(41%) sepia(72%) saturate(392%) hue-rotate(126deg) brightness(96%) contrast(101%);', // sky dark #1d8e84
    '  --d-pink: invert(43%) sepia(16%) saturate(1242%) hue-rotate(289deg) brightness(100%) contrast(85%);', // pink dark #af627b
    '  --d-brown: invert(17%) sepia(30%) saturate(1009%) hue-rotate(349deg) brightness(94%) contrast(95%);', // brown dark #442b12
    '  --d-rose: invert(14%) sepia(95%) saturate(5904%) hue-rotate(300deg) brightness(78%) contrast(105%);', // rose dark #af019a
    '  --d-orange: invert(17%) sepia(96%) saturate(2901%) hue-rotate(13deg) brightness(92%) contrast(98%);', // orange dark #af2b02
    '  --d-default: invert(100%) brightness(40%);', // unkonwn dark

    // Feign icon images
    "  --feign-icon-bg: url(data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAADICAYAAAAtK5mNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC2klEQVR42u3d0W6jMBBA0Rjl/3/Zfa9Qa7DBY8+57wVCTsZmlVU+H0lqrWz0Wqr7mPMFVffXha8KYRsoBQRAol5gJhDLICkwABLhYoBYBEgBAo5ZFwDFgjgKEIC8eVIoFsdRgIDj6ZNBsRGOAgUcT50Eig1xFCjgGH1wKDbGUaCAY9RBoUiA44BCI2AoZnUmDNPCxFD2qVFmnFTxN6IHFLKUWFKGwTAtTAyZGmCoA4ZlBAxZTtpgmBYmhgSG5aQDhmVEJobAEBjq3Roc9hcyMQSGwBAYmgHDxlMmhsDQjdUADIEhMASGwBAYAkOBYfhXT5kYAkNgCAyBITAEhsAQGAJDYAgMCQyBITAEhsAQGAJDYGhu5S6M4t7JxBAYAkNgCAxNh+HJRCaGwNCNzpYP//N9//fYxNC4pcQmVCaGZeTeH9pvJETR+sdwJENx5QBwJEJhjwEFGAIjc8OWfJtPy4qJoXGqTIukU8PEsOcAA44xo8YyknhZMTFMDjDUP14sI8mXFBPDkgKG7DHUOTUO+wuZGGoeAGAIDLVPjcP+QiaGwFDfcgKGTAy1Tw0w9O/E8EQiE0N/LydgyMQQGOpcTsCQiSEwBIae2GeAIRNDYAgMgSEwBIbAEBgCQ2AIDIEhgaGrMPxInkwMgSEwNCo/4a1TEyaGLCXqg+GxVSaGzocCGGp+KvF0woKJoesTw9RI7MAvNevUwNd9AeLOUmJq5Ns+XIIBx8YIzjreOIlyiDI5Np4UvQeAY2MUvQeBY1MUIw4Ex2YgRh4Qjo1AjD4wHJuAeOoEgCwO4ukTAbIoiDdPCMkiGGafHJSgGCJcCBzBIPzON7igAEPtfX1KLW/ZJ4avDQSH4ZMJhsAQGAJDYEhgCAyBITAEhsAQGAJDYAgMgSEwNs23t8DQqjB8esGw3Kz64Ti8CYp402rQ11ezQ41ykTXoa6vZQES82MhvQs2AYYULr5neBGmZfgBTrFlOeRQQNQAAAABJRU5ErkJggg==);",
    "  --feign-icon-fg: url(data:image/webp;base64,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);",
    "}",
  ];
  return data.join('\n');
}