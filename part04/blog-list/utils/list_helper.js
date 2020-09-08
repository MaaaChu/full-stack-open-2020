const dummy = () => {
  return 1
}

const getTotalLikes = (blogs) => {
  const totalLikes = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
  return totalLikes
}

const findBlogWithMostLikes = (blogs) => {
  const mostLikedPost = blogs.reduce((mostLiked, blog) => {
    if(blog.likes > mostLiked.likes) return mostLiked = blog
    else return mostLiked
  }, blogs[0])
  return mostLikedPost
}

module.exports = {
  dummy,
  getTotalLikes,
  findBlogWithMostLikes
}