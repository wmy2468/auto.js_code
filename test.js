var idxText;
text('去完成').findOne();
unComplete = text('去完成').find();
idxText = unComplete[0].parent().parent().parent().child(0).child(1).text();
toastLog(idxText);