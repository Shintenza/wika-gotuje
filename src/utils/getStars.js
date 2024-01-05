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

  for (let i = 0; i < 5; i++) {
    if (rating >= 0.75) {
      stars.push(
        <MdStar color='#FF8051' key={i} index={i} onClick={callback} />,
      );
    } else if (rating >= 0.25) {
      stars.push(
        <MdStarHalf color='#FF8051' key={i} index={i} onClick={callback} />,
      );
    } else {
      stars.push(
        <MdStarBorder color='#FF8051' key={i} index={i} onClick={callback} />,
      );
    }
    rating--;
  }

  return stars;
}
