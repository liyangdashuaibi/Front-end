<template>
    <div class="detail-wrap">
        <div class="detail-top">
            <h3>数据预测</h3>
            <p class="brief">大数据预测是大数据最核心的应用，大数据预测将传统意义预测”拓展到“现测”。 </p>
            <form>
                <table width="200">
                    <tr>
                        <td>购买数量：</td>
                        <td>
                            <select>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>产品类型：</td>
                        <td>
                            <select>
                                <option value="">入门版</option>
                                <option value="">提升版</option>
                                <option value="">高级版</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>有效期：</td>
                        <td>半年</td>
                    </tr>
                    <tr>
                        <td>总价：</td>
                        <td>500元</td>
                    </tr>
                    <tr>
                        <td colspan="2" align="right">
                            <button><a href="javascript:;">立即购买</a></button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="detail-bottom">
            <h3>产品说明</h3>
            <p>在小数据时代，由于缺乏获取全体样本的手段，人们发明了“随机调研数据”的方法。理论上，抽取样本越随机，就越能代表整体样本。但问题是获取一个随机样本代价极高，而且很费时。人口调查就是典型一例，即使一个大国都做不到每年都发布一次人口调查，因为随机调研实在是太耗时耗力。但有了云计算和数据库以后，获取足够大的样本数据乃至全体数据，就变得非常容易。谷歌可以提供谷歌流感趋势的原因就在于它几乎覆盖7成以上的北美搜索市场，已经完全没有必要去抽样调查这些数据，只需要对大数据记录仓库进行挖掘和分析。</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'count'
}
</script>

<style>

</style>
