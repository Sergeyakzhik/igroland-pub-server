const BlogService = require('../services/blog.services');
const errorEnvelope = require('../utils').errorEnvelope;

const getBlogPosts = async (req, res) => {
    const result = await BlogService.getBlogPosts();

    if (!result) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    res.status(200).json(result);
};

const getPublishedBlogPosts = async (req, res) => {
    const result = await BlogService.getPublishedBlogPosts();

    if (!result) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    res.status(200).json(result);
};

const getBlogPostsOrder = async (req, res) => {
    const result = await BlogService.getBlogPostsOrder();

    if (!result) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    res.status(200).json(result);
};

const getBlogPostById = async (req, res) => {
    const id = req.params.id;
    let result;

    try {
        result = await BlogService.getBlogPostById(id);
    } catch (err) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    if (!result) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    res.status(200).json(result);
};

const changePostsOrder = async (req, res) => {
    const result = await BlogService.changePostsOrder(req.body);

    if (!result) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    res.status(200).json(result);
};

const getBlogPostsNumber = async (req, res) => {
    const result = await BlogService.getBlogPostsNumber();

    if (!result) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    res.status(200).json(result);
};

const createBlogPost = async (req, res) => {
    const data = req.body;

    const result = await BlogService.createBlogPost({ ...data, editor_state: data.editorState });

    if (!result) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    res.status(200).json({ id: result });
};

const updateBlogPost = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const result = await BlogService.updateBlogPost({ ...data, editor_state: data.editorState }, id);

    if (!result) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    res.status(200).json({});
};

const setPublished = async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const result = await BlogService.setPublished({ published: data.published }, id);

    if (!result) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    res.status(200).json({});
};

const deleteBlogPost = async (req, res) => {
    const id = req.params.id;
    let result;

    try {
        result = await BlogService.deleteBlogPost({ where: { id } });
    } catch (err) {
        console.log(err)
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    if (!result) {
        res.status(500).json(errorEnvelope('Server error'));
		return;
    }

    res.status(200).json({});
};

module.exports = {
    createBlogPost,
    getBlogPostById,
    changePostsOrder,
    getBlogPostsNumber,
    getBlogPosts,
    getPublishedBlogPosts,
    getBlogPostsOrder,
    updateBlogPost,
    setPublished,
    deleteBlogPost
};