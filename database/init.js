db = db.getSiblingDB('blogdb');
db.createCollection('comments');

// // 댓글 작성자 배열
// const userNames = [
//   "김철수", "이영희", "박지민", "최준호", "정다혜", 
//   "강현우", "윤서연", "장민준", "임수진", "한지훈",
//   "서민지", "오태양", "신지원", "백승민", "송예린"
// ];

// // 댓글 내용 템플릿
// const commentTemplates = [
//   "정말 좋은 글이네요. 많은 도움이 됐습니다.",
//   "흥미로운 내용이었습니다. 더 알고 싶어요.",
//   "이런 주제에 대해 글을 써주셔서 감사합니다.",
//   "글을 읽고 많은 생각을 하게 됐습니다.",
//   "정보가 매우 유익했습니다.",
//   "이 글을 친구들에게도 공유하고 싶네요.",
//   "설명이 아주 명확해서 이해하기 쉬웠습니다.",
//   "새로운 관점을 알게 되어 좋았습니다.",
//   "궁금했던 내용인데 답을 얻게 되어 기쁩니다.",
//   "다음 글도 기대하고 있겠습니다."
// ];

// // 답변 템플릿
// const replyTemplates = [
//   "저도 같은 생각입니다.",
//   "좋은 의견 감사합니다.",
//   "추가 정보가 필요하시면 알려드릴게요.",
//   "댓글 감사합니다!",
//   "말씀해주신 내용에 전적으로 동의합니다.",
//   "흥미로운 관점이네요.",
//   "도움이 되었다니 기쁩니다.",
//   "좋은 하루 되세요!"
// ];

// // 댓글 데이터 생성
// const commentData = [];

// // 게시글 1~27번까지 댓글 생성
// for (let postNum = 1; postNum <= 27; postNum++) {
//   // 각 게시물별 댓글 수 랜덤 결정 (1~5)
//   const commentCount = Math.floor(Math.random() * 5) + 1;
  
//   for (let i = 0; i < commentCount; i++) {
//     // 랜덤 사용자 이름 선택
//     const userName = userNames[Math.floor(Math.random() * userNames.length)];
    
//     // 랜덤 댓글 내용 선택
//     const content = commentTemplates[Math.floor(Math.random() * commentTemplates.length)];
    
//     // 댓글 생성 시간 (최근 30일 이내 랜덤)
//     const createdAt = new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000));
    
//     // 랜덤으로 답변 생성 (0~3개)
//     const replyCount = Math.floor(Math.random() * 4);
//     const replies = [];
    
//     for (let j = 0; j < replyCount; j++) {
//       const replyUserName = userNames[Math.floor(Math.random() * userNames.length)];
//       const replyContent = replyTemplates[Math.floor(Math.random() * replyTemplates.length)];
//       const replyCreatedAt = new Date(createdAt.getTime() + Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000));
      
//       replies.push({
//         _id: ObjectId(),
//         userName: replyUserName,
//         content: replyContent,
//         createdAt: replyCreatedAt
//       });
//     }
    
//     // 댓글 객체 생성 및 추가 - postId를 문자열로 저장
//     commentData.push({
//       postId: postNum.toString(), // 게시글 인덱스를 문자열로 저장
//       userName: userName,
//       content: `${postNum}번 게시글에 대한 댓글: ${content}`,
//       createdAt: createdAt,
//       replies: replies
//     });
//   }
// }

// // 댓글 데이터 삽입
// db.comments.insertMany(commentData);

// // 삽입된 댓글 수 확인
// print(`총 ${commentData.length}개의 댓글이 생성되었습니다.`);