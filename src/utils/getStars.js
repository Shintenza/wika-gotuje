import { MdStar, MdStarHalf, MdStarBorder } from 'react-icons/md';

export default function getStars(reviews) {
  const avgRating =
    reviews.length == 0
      ? 0
      : reviews.reduce((a, b) => {
          return a + b.stars;
        }, 0) / reviews.length;

  const stars = [];
  let starIndex = 0;

  let decimalPart = avgRating - Math.floor(avgRating);

  if (decimalPart <= 0.25) decimalPart = 0;
  else if (decimalPart >= 0.75) decimalPart = 1;
  else decimalPart = 0.5;

  for (let i = 0; i < Math.floor(avgRating + decimalPart); i++) {
    stars.push(<MdStar color='#FF8051' key={starIndex} />);
    starIndex++;
  }

  if (decimalPart === 0.5) {
    stars.push(<MdStarHalf color='#FF8051' key={starIndex} />);
    starIndex++;
  }

  const starsLeft =
    5 - (Math.floor(avgRating + decimalPart) + (decimalPart === 0.5 ? 1 : 0));

  for (let i = 0; i < starsLeft; i++) {
    stars.push(<MdStarBorder color='#FF8051' key={starIndex} />);
    starIndex++;
  }

  return [avgRating, stars];
}
