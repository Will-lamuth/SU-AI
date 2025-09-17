export default {
    name: 'member',
    type: 'document',
    title: 'Member / Author',
    fields: [
      { name: 'name', type: 'string', title: 'Full Name' },
      {
        name: 'socials',
        type: 'array',
        title: 'Social Links',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'platform',
                type: 'string',
                title: 'Platform',
                options: {
                  list: [
                    { title: 'LinkedIn', value: 'linkedin' },
                    { title: 'GitHub', value: 'github' },
                    { title: 'Email', value: 'email' },
                    { title: 'Discord', value: 'discord' },
                  ],
                },
              },
              { name: 'url', type: 'string', title: 'URL' },
            ],
          },
        ],
      },
      { name: 'role', 
      type: 'string', 
      title: 'Club role', 
      options: {
        list: [
            { title: 'President', value: 'President' },
            { title: 'Vice President', value: 'Vice President' },
            { title: 'Secretary', value: 'Secretary' },
            { title: 'SGA Representative', value: 'SGA Representative' },
            { title: 'Treasurer', value: 'Treasurer' },
            { title: 'Member', value: 'Member' },
          ],
      }
    },
    {
        name: 'avatar',
        type: 'image',
        title: 'Profile Picture',
        options: {
          hotspot: true, 
        },
      }
    ],
  };