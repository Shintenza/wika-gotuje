import { MdStar, MdStarHalf, MdStarBorder } from 'react-icons/md';

export function calcAvgRating(reviews) {
  return reviews.length == 0
    ? 0
    : reviews.reduce((a, b) => {
        return a + b.stars;
      }, 0) / reviews.length;
}

export default function getStars(rating, callback = null) {
  const stars = [];
  let starIndex = 0;

  let decimalPart = rating - Math.floor(rating);

  if (decimalPart <= 0.25) decimalPart = 0;
  else if (decimalPart >= 0.75) decimalPart = 1;
  else decimalPart = 0.5;

  for (let i = 0; i < Math.floor(rating + decimalPart); i++) {
    stars.push(
      <MdStar
        color='#FF8051'
        key={starIndex}
        index={starIndex}
        onClick={callback}
      />,
    );
    starIndex++;
  }

  if (decimalPart === 0.5) {
    stars.push(
      <MdStarHalf
        color='#FF8051'
        key={starIndex}
        index={starIndex}
        onClick={callback}
      />,
    );
    starIndex++;
  }

  const starsLeft =
    5 - (Math.floor(rating + decimalPart) + (decimalPart === 0.5 ? 1 : 0));

  for (let i = 0; i < starsLeft; i++) {
    stars.push(
      <MdStarBorder
        color='#FF8051'
        key={starIndex}
        index={starIndex}
        onClick={callback}
      />,
    );
    starIndex++;
  }

  return stars;
}
