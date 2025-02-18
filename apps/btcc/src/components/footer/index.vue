<template>
  <div class="footer">
    <List></List>
    <Contact></Contact>
    <div class="solgan">
      <img src="@/assets/img/friends/logo.svg" />
      <p>Exchange for a better future</p>
      <img src="@/assets/img/friends/dunpai.png" class="safe" />
      <div class="img-groups">
        <div class="bg">
          <img src="@/assets/img/friends/circle.png" />
        </div>
        <div class="bg">
          <img src="@/assets/img/friends/visa.png" />
        </div>
      </div>
    </div>
    <div class="tips">
      <p>
        {{ $t('tips.fengxiantishi') }}
      </p>
    </div>
    <div class="tips small">
      <p>
        {{ $t('banquan.info') }}
      </p>
    </div>
    <p class="others">
      BTCC Lithuania Limited UAB, a private limited company incorporated in
      Vilnius, Girulių g. 10-201 Lithuania regulated by FCIS (Company
      registration No.: 305950582)
    </p>
  </div>
</template>

<script setup>
import List from '@/components/lists/index.vue'
import Contact from '@/components/contact/index.vue'
</script>

<style lang="scss" scoped>
.footer {
  background-color: #232528;
  .solgan {
    box-sizing: border-box;
    height: 250px;
    position: relative;
    padding: 32px 16px 16px;
    img {
      width: 100px;
      height: 24px;
      display: block;
      margin-bottom: 24px;
    }
    p {
      color: #999;
      font-size: 14px;
    }
    .safe {
      width: 66px;
      height: 66px;
    }
    .img-groups {
      display: flex;
      gap: 14px;
      .bg {
        width: 40px;
        height: 32px;
        background-color: #fff;
        border-radius: 4px;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
  .tips {
    padding: 24px 16px;
    p {
      margin: 0;
      font-size: 12px;
      line-height: 20px;
      word-wrap: break-word;
      text-align: justify;
      color: #999;
      // text-align-last: justify;
    }
    border-bottom: 0.5px solid rgba(211, 211, 211, 0.2);
  }
  .small {
    padding: 10px 16px 0;
    p {
      font-size: 10px;
    }
    border-bottom: none;
  }
  .others {
    font-size: 12px;
    color: #999;
    line-height: 15px;
    // margin: 0;
    padding: 10px;
  }
}
</style>
