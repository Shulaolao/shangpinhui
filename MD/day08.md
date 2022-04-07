1.分页器原理
（1）
pageNo：当前第几页
total：总共几页
pageSize：每页元素个数
continues：连续页码个数，奇数
（2）当前第5页：
    3 4 5 6 7
（3）分页器考虑情况：
连续页码大于总页数 totalPage，则令 totalPage = 5，至少为5
pageNo 为 1、2 时，需要令 start 为 1
pageNo 为 totalPage、totalPage-1 时，需要令 end 为 totalPage-2
另外，在页面结构中，
'1' 按钮 用v-if 判断 start > 2 与否，是则显示，否隐藏
第一个 '...' 按钮 用v-if 判断 start > 1 与否，是则显示
第二个 '...' 按钮 用v-if 判断 end < totalPage-1 与否，是则显示
totalPage 按钮 用v-if 判断 end < totalPage 与否，是则显示