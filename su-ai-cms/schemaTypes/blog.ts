export default {
    name: 'blog',
    type: 'document',
    title: 'Blog',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title of blog post',
        },
        {
            name:'slug',
            type:'slug',
            title:'Slug of your blog post',
            options: {
                source: "title",
            },
        },
        {
            name: 'titleImage',
            type: 'image',
            title: 'Image of blog post',
        },
        {
            name: 'smallDescription',
            type: 'text',
            title: 'Small description of blog post',
        },
        {
            name: 'Content',
            type: 'array',
            title: 'Content',
            of: [
                {
                    type: 'block',
                },
            ],
        },
        {
            name: 'Authors',
            type: 'string',
            title: 'Author of blog post'
        },
        {
            name: 'Date',
            type: 'datetime',
            title: 'Date of blog post'
        }
    ],
}