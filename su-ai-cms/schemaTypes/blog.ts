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
            type: 'array', // allows multiple authors
            title: 'Authors',
            validation: (rule: { required: () => any; }) => rule.required().max(1),
            of: [
              {
                type: 'reference',
                to: [{ type: 'member' }] // reference the member schema
              }
            ],
          },
          {
            name: 'Topics',
            type: 'array', 
            title: 'Topic Name',
            validation: (rule: { required: () => any; }) => rule.required(),
            of: [
              {
                type: 'reference',
                to: [{ type: 'topics' }]
              }
            ],
          },
        {
            name: 'Date',
            type: 'datetime',
            title: 'Date of blog post'
        },
        
    ],
}