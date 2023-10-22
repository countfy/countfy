export const getUserProjects = async () => {

  return await {
    "meta": {
      "status": "success",
      "message": "UserProjects retrieved successfully"
    },
    "data": [
      {
        "id": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
        "role": "owner",
        "user_id": "x9w8v7y6-z5u4-t3r2-q1p0-n9o8m7l6k5j4",
        "project": {
          "id": "q1w2e3r4-t5y6-u7i8-o9p0-a1s2d3f4g5h6",
          "name": "Project A"
        },
        "created_at": "2023-10-19T12:00:00.000Z",
        "updated_at": "2023-10-20T09:00:00.000Z"
      },
      {
        "id": "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6a7",
        "role": "member",
        "user_id": "y7z8x9w0-u1t2-s3r4-q5p6-o7n8m9l0k6j5",
        "project": {
          "id": "r2t3y4u5-i6o7-p8a9-s0d1-f2g3h4j5k6l7",
          "name": "Project B"
        },
        "created_at": "2023-10-18T15:00:00.000Z",
        "updated_at": "2023-10-19T10:00:00.000Z"
      },
      {
        "id": "c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6a7b8",
        "role": "owner",
        "user_id": "w0v1u2t3-r4s5-q6p7-o8n9-m0l1k2j3h4g5",
        "project": {
          "id": "t3u4i5o6-p7a8-s9d0-f1g2-h3j4k5l6m7n8",
          "name": "Project C"
        },
        "created_at": "2023-10-17T16:00:00.000Z",
        "updated_at": "2023-10-18T11:00:00.000Z"
      },
      {
        "id": "d4e5f6g7-h8i9-j0k1-l2m3-n4o5p6a7b8c9",
        "role": "member",
        "user_id": "v1w2x3y4-z5u6-t7r8-s9p0-a1b2c3d4e5f6",
        "project": {
          "id": "u4i5o6p7-a8s9-d0f1-g2h3-j4k5l6m7n8o9",
          "name": "Project D"
        },
        "created_at": "2023-10-16T14:00:00.000Z",
        "updated_at": "2023-10-17T12:00:00.000Z"
      }
    ]
  }
}
