const { sanitizeEntity } = require('strapi-utils');

const sanitizeUser = user =>
  sanitizeEntity(user, {
    model: strapi.query('user', 'users-permissions').model,
  });

module.exports = {
  /**
   * Retrieve authenticated user.
   * @return {Object|Array}
   */
  async me(ctx) {
    const { id } = ctx.state.user;
    let data = await strapi.plugins['users-permissions'].services.user.fetch({
      id,
    });

    if (data) {
      data = sanitizeUser(data);
    }

    // Send 200 `ok`
    ctx.body = data;
  },
  unfollow: async ctx => {
    const { id } = ctx.state.user;
    const { userId } = ctx.params;
    const intUserId = parseInt(userId);

    console.log("This is Strapi's user id:", id)
    console.log("this is the ctx params", ctx.params)
    console.log("This is the parsed user id:", intUserId)
    let user = await strapi.plugins['users-permissions'].services.user.fetch({
      id,
    })
    let currentFollowees = user.followees.filter(followee => followee.id !== intUserId)
    // Returns a list of all users that does not correspond with the intUserId
    let updateUserFollowees = await strapi.plugins['users-permissions'].services.user.edit({ id }, {followees: currentFollowees})

    return sanitizeUser(updateUserFollowees);
  },
  unlike: async ctx => {
    const { id } = ctx.state.user;
    const { exhibits } = ctx.params;
    const intExhibitId = parseInt(exhibits);

    let user = await strapi.plugins['users-permissions'].services.user.fetch({
      id,
    })
    let likedExhibits = user.likes.filter(like => like.id !== intExhibitId)
    let updateUserLikes = await strapi.plugins['users-permissions'].services.user.edit({ id }, {likes: [likedExhibits]})
    return updateUserLikes;
  }
}