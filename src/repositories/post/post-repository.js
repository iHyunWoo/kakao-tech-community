

function getPostPreview() {
    return postPreviewCountDummyDataList;
}

function getPostDetail(id) {
    return postDetailDummyDataList.find(post => post.id === id);
}

export { getPostPreview, getPostDetail };

const postPreviewCountDummyDataList = [
    {
        id: 1,
        title: "제목 1",
        likeCount: 12,
        commentCount: 3,
        viewCount: 150,
        date: "2024-02-15 10:00:00",
        author: {
            name: "더미 작성자 1",
            profileImage: "https://placehold.co/36"
        }
    },
    {
        id: 2,
        title: "제목 2",
        likeCount: 7,
        commentCount: 1,
        viewCount: 85,
        date: "2024-02-14 15:30:00",
        author: {
            name: "더미 작성자 2",
            profileImage: "https://placehold.co/36"
        }
    },
    {
        id: 3,
        title: "제목 3",
        likeCount: 20,
        commentCount: 2,
        viewCount: 200,
        date: "2024-02-13 18:00:00",
        author: {
            name: "더미 작성자 3",
            profileImage: "https://placehold.co/36"
        }
    },
    {
        id: 4,
        title: "제목 4",
        likeCount: 5,
        commentCount: 0,
        viewCount: 45,
        date: "2024-02-12 09:45:00",
        author: {
            name: "더미 작성자 4",
            profileImage: "https://placehold.co/36"
        }
    },
    {
        id: 5,
        title: "제목 5",
        likeCount: 15,
        commentCount: 2,
        viewCount: 123,
        date: "2024-02-11 14:20:00",
        author: {
            name: "더미 작성자 5",
            profileImage: "https://placehold.co/36"
        }
    },
]

const postDetailDummyDataList = [
    {
        id: 1,
        title: "제목 1",
        likeCount: 12,
        commentCount: 2,
        viewCount: 150,
        date: "2024-02-15 10:00:00",
        content: "삶은 항상 놀라운 모험입니다. 우리는 매일 새로운 경험을 하고 배우며 성장합니다.",
        imageUrl: "https://placehold.co/544x306",
        isMine: true,
        author: {
            id: 1,
            name: "더미 작성자 1",
            profileImage: "https://placehold.co/36"
        },
        comments: [
            {
                id: 1,
                content: "정말 공감됩니다!",
                author: { id: 2, name: "더미 작성자 2", profileImage: "https://placehold.co/36" },
                isMine: false,
            },
            {
                id: 2,
                content: "멋진 글이에요!",
                author: { id: 3, name: "더미 작성자 3", profileImage: "https://placehold.co/36" },
                isMine: false,
            }
        ]
    },
    {
        id: 2,
        title: "제목 2",
        likeCount: 7,
        commentCount: 1,
        viewCount: 85,
        date: "2024-02-14 15:30:00",
        content: "자연은 우리의 생명과 안정을 지키며 우리에게 힘을 주는 곳입니다.",
        imageUrl: "https://placehold.co/544x306",
        isMine: false,
        author: {
            id: 2,
            name: "더미 작성자 2",
            profileImage: "https://placehold.co/36"
        },
        comments: [
            {
                id: 3,
                content: "자연은 정말 소중하죠!",
                author: { id: 1, name: "더미 작성자 1", profileImage: "https://placehold.co/36" },
                isMine: true,
            }
        ]
    },
    {
        id: 3,
        title: "제목 3",
        likeCount: 20,
        commentCount: 2,
        viewCount: 200,
        date: "2024-02-13 18:00:00",
        content: "지식을 향한 탐구는 항상 흥미로운 여정입니다.",
        imageUrl: "https://placehold.co/544x306",
        isMine: true,
        author: {
            id: 1,
            name: "더미 작성자 1",
            profileImage: "https://placehold.co/36"
        },
        comments: [
            {
                id: 4,
                content: "지식 탐구는 끝이 없죠!",
                author: { id: 4, name: "더미 작성자 4", profileImage: "https://placehold.co/36" },
                isMine: false,
            },
            {
                id: 5,
                content: "흥미로운 주제입니다.",
                author: { id: 1, name: "더미 작성자 1", profileImage: "https://placehold.co/36" },
                isMine: true,
            }
        ]
    },
    {
        id: 4,
        title: "제목 4",
        likeCount: 5,
        commentCount: 0,
        viewCount: 45,
        date: "2024-02-12 09:45:00",
        content: "세상은 놀라움과 경이로움으로 가득 차 있습니다.",
        imageUrl: "https://placehold.co/544x306",
        isMine: false,
        author: {
            id: 3,
            name: "더미 작성자 3",
            profileImage: "https://placehold.co/36"
        },
        comments: []
    },
    {
        id: 5,
        title: "제목 5",
        likeCount: 15,
        commentCount: 2,
        viewCount: 123,
        date: "2024-02-11 14:20:00",
        content: "삶에서 가장 중요한 것은 함께 나누는 순간들입니다.",
        imageUrl: "https://placehold.co/544x306",
        isMine: true,
        author: {
            id: 1,
            name: "더미 작성자 1",
            profileImage: "https://placehold.co/36"
        },
        comments: [
            {
                id: 6,
                content: "정말 좋은 말씀입니다.",
                author: { id: 5, name: "더미 작성자 5", profileImage: "https://placehold.co/36" },
                isMine: false,
            },
            {
                id: 7,
                content: "공감해요!",
                author: { id: 1, name: "더미 작성자 1", profileImage: "https://placehold.co/36" },
                isMine: true,
            }
        ]
    }
];
