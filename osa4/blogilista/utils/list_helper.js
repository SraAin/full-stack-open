const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((total, currentVal) => total + currentVal.likes, 0);
};

// favoriteBlog-funktio selvittää millä blogilla on eniten tykkäyksiä
const favoriteBlog = (blogs) => {
  const highestLikeAmount = Math.max(...blogs.map((blog) => blog.likes));

  return blogs.find((blog) => blog.likes === highestLikeAmount);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
