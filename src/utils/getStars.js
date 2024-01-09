import { MdStar, MdStarHalf, MdStarBorder } from 'react-icons/md';

export function calcAvgRating(reviews) {
  return reviews.length == 0
    ? 0
    : reviews.reduce((a, b) => {
        return a + b.stars;
      }, 0) / reviews.length;
}

export default function getStars(
  rating,
  onClick = null,
  onMouseEnter = null,
  onMouseLeave = null,
) {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    let star;
    const props = {
      color: '#FF8051',
      index: i,
      onClick,
      onMouseEnter,
      onMouseLeave,
      className: 'rating-star',
    };
    if (rating >= 0.75) {
      star = <MdStar key={i} {...props} />;
    } else if (rating >= 0.25) {
      star = <MdStarHalf key={i} {...props} />;
    } else {
      star = <MdStarBorder key={i} {...props} />;
    }
    stars.push(star);
    rating--;
  }

  return stars;
}
