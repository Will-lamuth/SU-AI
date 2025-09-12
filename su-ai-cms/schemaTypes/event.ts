export default {
    name: 'event',
    type: 'document',
    title: 'Event',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title of blog',
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
            name: 'eventTime',
            type: 'datetime',
            title: 'Event date & time',
        }
    ],
}
