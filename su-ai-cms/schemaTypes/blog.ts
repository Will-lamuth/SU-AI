export default {
    name: 'blog',
    type: 'document',
    title: 'Blog',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title of blog',
        },
        {
            name:'slug',
            type:'slug',
            title:'Slug of your blog',
            options: {
                source: "title",
            },
        },
        {
            name: 'titleImage',
            type: 'image',
            title: 'Image of blog',
        },
        {
            name: 'smallDescription',
            type: 'text',
            title: 'Small description of blog',
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
    ],
}