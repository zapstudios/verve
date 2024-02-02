export default {
    "layout": [
        {
            "blockType": "content" as const,
            "blockName": "Page Content",
            "content": [
                {
                    "children": [
                        {
                            "text": "This is a sample page which is only visible to authenticated users."
                        }
                    ],
                    "type": "h3"
                },
                {
                    "children": [
                        {
                            "text": ""
                        },
                        {
                            "type": "link",
                            "url": "/",
                            "newTab": false,
                            "children": [
                                {
                                    "text": "Go back home"
                                }
                            ]
                        },
                        {
                            "text": ""
                        }
                    ],
                    "type": "p"
                }
            ]
        }
    ],
    "title": "Posts",
    "public": false,
    "slug": "posts" as const,
    "meta": {}
}
