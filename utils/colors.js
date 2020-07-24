export const PodbayColors = {
  default: [
    '#FF78C9',
    '#E86491',
    '#CF8163',
    '#E3BD71',
    '#6DC086',
    '#3ADEE6',
    '#4DAEE8',
    '#7B7BF0',
    '#9B7DD9',
    '#BA6FDE',
  ],
  dark: [
    '#80406B',
    '#873A56',
    '#785033',
    '#8A6E52',
    '#52785D',
    '#21888F',
    '#456C91',
    '#404080',
    '#533E7D',
    '#6B4080',
  ],
  light: [
    '#EBBCE0',
    '#EDC3D0',
    '#F2D9D0',
    '#EAEDD3',
    '#CFE8D6',
    '#C2F5F0',
    '#C3DFEB',
    '#BEBEE8',
    '#CBB7E8',
    '#DDB5E8',
  ],
};

export const getColorForStringColor = (color, type = 'default') => {
  let colorIndex = 0;
  if (color == 'red' || color == 'red1') colorIndex = 0;
  else if (color == 'red2') colorIndex = 1;
  else if (color == 'yellow' || color == 'yellow1') colorIndex = 2;
  else if (color == 'yellow2') colorIndex = 3;
  else if (color == 'green' || color == 'green1') colorIndex = 4;
  else if (color == 'green2') colorIndex = 5;
  else if (color == 'blue' || color == 'blue1') colorIndex = 6;
  else if (color == 'blue2') colorIndex = 7;
  else if (color == 'purple' || color == 'purple1') colorIndex = 8;
  else if (color == 'purple2') colorIndex = 9;
  return PodbayColors[type][colorIndex];
};

export const getColorForHue = (hue, type = 'default') => {
  let colorIndex = 0;
  hue = hue % 360;
  if (hue > 290 && hue <= 330) colorIndex = 0;
  else if ((hue > 330 && hue <= 360) || (hue >= 0 && hue <= 10)) colorIndex = 1;
  else if (hue > 10 && hue <= 30) colorIndex = 2;
  else if (hue > 30 && hue <= 120) colorIndex = 3;
  else if (hue > 120 && hue <= 160) colorIndex = 4;
  else if (hue > 160 && hue <= 180) colorIndex = 5;
  else if (hue > 180 && hue <= 200) colorIndex = 6;
  else if (hue > 200 && hue <= 230) colorIndex = 7;
  else if (hue > 230 && hue <= 250) colorIndex = 8;
  else if (hue > 250 && hue <= 290) colorIndex = 9;
  return PodbayColors[type][colorIndex];
};
