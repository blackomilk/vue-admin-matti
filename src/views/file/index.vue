<template>
  <div>
    file
  </div>
</template>

<script>
export default {
  data() {
    return {
      l1: {
        val: 1,
        next: {
          val: 2,
          next: { val: 4, next: null }
        }
      },
      l2: {
        val: 1,
        next: {
          val: 3,
          next: { val: 4, next: null }
        }
      }
    };
  },
  mounted() {
    // let a = this.mergeTwoLists(this.l1, this.l2);
    // console.log("aaa", a);
    let a = this.a([1, 1, 2, 3, 4, 4, 5, 5, 6, 6]);
    console.log('aaa',a)
  },
  methods: {
    a(array) {
      if (array.length === 0) return 0;

      let i = 0;
      for (let j = 1; j < array.length; j++) {
        // debugger
        if (array[j] != array[i]) {
          i++;
          array[i] = array[j];
        }
      }
      return i+1;
    }
    // mergeTwoLists(l1, l2) {
    //   if (l1 === null) {
    //     return l2;
    //   } else if (l2 === null) {
    //     return l1;
    //   } else if (l1.val < l2.val) {
    //     l1.next = this.mergeTwoLists(l1.next, l2);
    //     return l1;
    //   } else {
    //     l2.next = this.mergeTwoLists(l1, l2.next);
    //     return l2;
    //   }
    // }
  }
};
</script>
