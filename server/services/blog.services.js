const BlogPosts = require('../models/blog_posts.models');
const BlogPostTags = require('../models/blog_post_tags.models');
const BlogPostReferences = require('../models/blog_post_references.models');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
});

const getBlogPosts = () => {
    return BlogPosts.findAll({ attributes: ['id', 'title', 'description', 'category', 'time', 'image', 'order', 'published', 'createdAt'] });
};

const getPublishedBlogPosts = () => {
    return BlogPosts.findAll({ 
        attributes: ['id', 'title', 'description', 'category', 'time', 'image', 'order', 'published', 'createdAt'],
        where: { published: 1 }
    });
};

const getBlogPostsOrder = () => {
    return BlogPosts.findAll({
        attributes: ['id', 'order'],
        where: { published: 1 }
    });
};

const getBlogPostById = id => {
    return BlogPosts.findOne({
        include: [{
            model: BlogPostTags,
            attributes: ['name']
        }, {
            model: BlogPostReferences,
            attributes: ['name', 'link']
        }],
        where: { id }
    });
};

const changePostsOrder = orderArr => {
    return Promise.all(orderArr.map((item, ind) => BlogPosts.update({ order: ind }, { where: { id: item } })));
};

const getBlogPostsNumber = () => {
    return BlogPosts.count();
};

const createBlogPost = async query => {
    const { tags = [], references = [] } = query;
    let result = await BlogPosts.create(query);
    
    if (!result) {
        return;
    }

    const { id } = result.dataValues;

    result = await Promise.all([
        ...tags.map(item => BlogPostTags.create({ post: id, name: item })),
        ...references.map(item => BlogPostReferences.create({ post: id, name: item.name, link: item.link }))
    ]);

    return id;
};

const updateBlogPost = async (data, id) => {
    const { tags = [], references = [], image } = data;
    const result = await BlogPosts.update(data, { where: { id } });
    
    if (!result) {
        return;
    }

    const blogPostData = await getBlogPostById(id);
    const blogPostTags = blogPostData.blog_post_tags.map(item => item.name);
    const blogPostReferences = blogPostData.blog_post_references.map(item => item.name);

    await Promise.all([ ...blogPostTags.map(item => BlogPostTags.destroy({ where: { post: id, name: item } })) ]);
    await Promise.all([ ...blogPostReferences.map(item => BlogPostReferences.destroy({ where: { post: id, name: item } })) ]);

    return await Promise.all([
        ...tags.map(item => BlogPostTags.create({ post: id, name: item })),
        ...references.map(item => BlogPostReferences.create({ post: id, name: item.name, link: item.link }))
    ]);
};

const updateBlogPostImage = (image, id) => {
    return BlogPosts.update({ image }, { where: { id } });
};

const setPublished = (data, id) => {
    return BlogPosts.update(data, { where: { id } });
};

const deleteBlogPost = query => {
    return BlogPosts.destroy(query);
};

module.exports = {
    getBlogPosts,
    getPublishedBlogPosts,
    getBlogPostsOrder,
    getBlogPostById,
    changePostsOrder,
    getBlogPostsNumber,
    createBlogPost,
    updateBlogPost,
    updateBlogPostImage,
    setPublished,
    deleteBlogPost
};