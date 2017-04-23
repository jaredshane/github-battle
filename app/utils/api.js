const axios = require('axios')
const { clientId, secret } = require('../github-tokens')

let params = `?client_id=${clientId}&client_secret=${secret}`


module.exports.fetchPopularRepos = (language) => {
    let encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories')

    return axios.get(encodedURI)
      .then( (res) => {
        return res.data.items
      })
  }

let getProfile = (username) => {
  return axios.get(`https://api.github.com/users/${username}${params}`)
    .then( (user) => {
      return user.data
    })
}

let getRepos = (username) => {
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
}

let getStarCount = (repos) => {
  return repos.data.reduce( (count, repo) => {
    return count + repo.stargazers_count
  }, 0)
}

let calculateScore = (profile, repos) => {
  let followers = profile.followers
  let totalStars = getStarCount(repos)

  return (followers * 3) + totalStars
}

let handleError = (error) => {
  console.warn(error)
  return null
}

let getUserData = (player) => {
  return axios.all([
      getProfile(player),
      getRepos(player)
  ]).then((data) => {
    let profile = data[0]
    let repos = data[1]
    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}

let sortPlayers = (players) => {
  return players.sort( (a,b) => {
    return b.score - a.score
  })
}

module.exports.battle = (players) => {
  return axios.all(players.map(getUserData))
    .then(sortPlayers)
    .catch(handleError)
}
