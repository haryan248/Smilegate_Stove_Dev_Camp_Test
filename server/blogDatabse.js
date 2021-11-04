// Mock Database
const BlogDatabase = {
    BlogPost: [],
    Comment: [],
    SubComment: [],
};

module.exports = {
    BlogPost: BlogDatabase.BlogPost,
    Comment: BlogDatabase.Comment,
    SubComment: BlogDatabase.SubComment,
};
