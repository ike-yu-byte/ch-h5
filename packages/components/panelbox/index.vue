<template>
  <div class="contain">
    <div class="header">{{ props.title }}</div>
    <div class="content">
      <slot></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<style scoped lang="scss">
.contain {
  border-radius: 24px;
  border-radius: 24px;
  overflow: hidden;
  width: 100%;
  .header {
    height: 50px;
    display: flex;
    align-items: center;
    background-color: var(--dark-color);
    color: var(--white-color);
    padding: 0 40px;
    font-size: 15px;
    font-weight: 700;
  }
  .content {
    display: flex;
    column-gap: 20px;
    background-color: var(--white-color);
    width: 100%;
  }
  .footer {
    padding: 20px 50px;
    background-color: var(--white-color);
  }
}
.mobile {
  .contain {
    border-radius: 4px;
    .header {
      background-color: var(--white-color);
      color: var(--dark-color);
      padding: 10px 16px 0;
      height: 23px;
    }
    .content {
      flex-direction: column;
      padding: 16px;
      .left {
        width: auto;
        .item {
          flex-direction: column;
          align-items: flex-start;
          width: auto;
          &:nth-child(n + 2) {
            margin: 10px 0;
          }
          .label {
            margin: 5px 0;
          }
          .box {
            width: 100%;
            :deep(.search-select) {
              height: 30px !important;
            }
          }
        }
        .btn-wrap {
          padding: 0px 0px 20px;
        }
      }
    }
    .footer {
      padding: 16px;
    }
  }
}
</style>
