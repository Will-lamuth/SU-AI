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
      },
      validation: (Rule: any) => Rule.custom(async (role: string, context: any) => {
        if (!role) return true; // allow empty
    
        // only check officer roles
        const restrictedRoles = ['President', 'Vice President', 'Secretary', 'SGA Representative', 'Treasurer'];
        if (!restrictedRoles.includes(role)) return true;
    
        const { getClient } = context;
        const client = getClient({ apiVersion: '2023-01-01' });
    
        const currentId = context.document._id.replace(/^drafts\./, "");

        const existing = await client.fetch(
          `*[_type == "member" && role == $role && !(_id in [$currentId, "drafts." + $currentId])][0]`,
          { role, currentId }
        );
    
        if (existing) {
          return `There is already a ${role} assigned.`;
        }
    
        return true;
      })
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