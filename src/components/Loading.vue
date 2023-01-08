<template>
  <div>
    <div class="circle-loading"></div>
  </div>
</template>
<style lang="scss">
.circle-loading {
  width: 50px;
  height: 50px;
  border-radius: 99rem;
  position: relative;
  margin: 0 auto;
}

.circle-loading:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  border: 4px solid transparent;
  border-right-color: #ff6bcb;
  border-bottom-color: #ffa400;
  animation: circleLoading 1s forwards infinite linear;
}

@keyframes circleLoading {
  to {
    transform: rotate(360deg);
  }
}
.circle-loading {
  width: 35px;
  height: 35px;
  border-radius: 99rem;
  position: relative;
  margin: 0 auto;
}

.circle-loading:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  border: 4px solid #a7c4d5;
  border-right-color: #4f8aab;
  animation: circleLoading 1s forwards infinite linear;
}

@keyframes circleLoading {
  to {
    transform: rotate(360deg);
  }
}
</style>
