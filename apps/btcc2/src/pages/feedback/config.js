export const tempConfig = [
    {
        label: '',
        hidden: true,
        children: [
            {
                type: 'select',
                label: '',
                value: '',
                key: 'type',
                options: [
                    {
                        label: '买币反馈',
                        value: 1
                    },
                    {
                        label: '充值反馈',
                        value: 2
                    }
                ]
            },
            {
                type: 'textarea',
                key: 'content',
                label: '',
                value: ''
            },
            {
                type: 'upload',
                key: 'file',
                label: '',
                value: ''
            }
        ]
    }
] 