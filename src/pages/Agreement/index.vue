<template>
  <view class="rich-text">
    <u-parse :content="content" :tagStyle="style" :previewImg="false" />
  </view>
</template>

<script setup lang="ts">
  const style = {
    img: 'display:block;min-width:702rpx',
  };
  const content =
    '<p style="text-align:center;" class="MsoNormal" align="center"><span style="font-size:15ptpx"><strong>个人信息使用授权书</strong></span></p><p style="text-align:center;" class="MsoNormal" align="center"> </p><p class="MsoNormal">您（即授权人本人，以下也称“本人”）正在使用杭州酷玩猩球网络科技有限公司（以下简称“酷玩猩球”）联合百度在线网络技术（北京）有限公司（以下简称“身份验证服务商”）向您提供的身份验证服务（包括身份证识别及银行卡识别）（以下简称“本服务”）。</p><p class="MsoNormal">为了保证您的合法权益，您应当阅读并遵守本授权书，请您务必审慎阅读、充分理解授权书条款内容，在您选择并点击同意本授权书后，即表示您已详细阅读如下条款，并且您授权同意酷玩猩球及身份验证服务商按照本授权书获取、储存和使用您的相关信息。</p><p class="MsoNormal">1.本人同意并授权，酷玩猩球及身份验证服务商（以下统称“被授权人”），可收集并存储本人在注册、使用服务时，所提供的姓名，身份证信息、影像，银行卡信息、影像等相关身份信息以及使用本服务的相关操作及行为信息（如操作记录、设备型号、位置信息）。上述信息是基于相关法律法规的要求，目为保护您的账户安全，用干身份核验。如本人拒绝提供上述信息，被授权人将无法为本人提供本服务，但不影响其为本人提供其他服务。</p><p class="MsoNormal">2.本人同意并授权，为了保障本人的信息安全，被授权人会在现有技术水平下采取合理必要的措施来保护本人的信息，采取物理、技术和行政管理安全措施来降低丢失、误用、非授权访问、披露和更改的风险，包括但不限于传输层数据加密、防火墙和加密存储、物理访问控制以及信息访问授权控制。为此本服务设置了安全程序保护您的信息不会被夫经授权的访问所窃取。在不幸发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们同时将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，主动向监管部门上报个人信息安全事件的处置情况。</p><p class="MsoNormal">3.本人同意并授权，基于国家相关法律法规的规定，以及为向本人提供服务及提升服务质量、向本人提供安全服务目的时，被授权人可能将收集的本人相关信息用作下列用途：</p><p class="MsoNormal">（1）基于国家相关主管部门的要求向相关部门进行报告；</p><p class="MsoNormal">（2）在本人使用本服务时，被授权人将本人的信息用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途，确保被授权人提供的产品和服务的安全性；</p><p class="MsoNormal">（3）经本人授权的其他用途。</p><p class="MsoNormal">授权人声明：</p><p class="MsoNormal">本授权书是本人向被授权人做出的单方承诺，效力具有独立性。</p><p class="MsoNormal">若本人与被授权人发生任何纠纷或争议，首先应友好协商解；协商不成的，本人同意将纠纷或争议提交本授权书签订地（即中国浙江省杭州区萧山区）有管辖权的人民法院管辖。本授权书的成立、生效、 履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。</p><p class="MsoNormal">本人已知悉本授权书所有内容（特别是加粗字体内容）的意义以及由此产生的法律效力，自愿作出上述授权，本授权书是本人真实的意思表示，本人同意承担由此带来的一切法律后果。特此授权！</p>';

  // '<p style="text-align:center;"><strong><span style="font-size:20px">个人信息使用授权书</span></strong></p><p style="text-align:center;"> </p><p>您（即授权人本人，以下也称“本人”）正在使用浙江联兴灵工有限公司（以下简称“联兴灵工”）联合百度在线网络技术（北京）有限公司（以下简称“身份验证服务商”）向您提供的身份验证服务（包括身份证识别及银行卡识别）（以下简称“本服务”）。</p><p>为了保证您的合法权益，您应当阅读并遵守本授权书，请您务必审慎阅读、充分理解授权书条款内容，在您选择并点击同意本授权书后，即表示您已详细阅读如下条款，并且您授权同意联兴灵工及身份验证服务商按照本授权书获取、储存和使用您的相关信息。</p><p>1.本人同意并授权，联兴灵工及身份验证服务商（以下统称“被授权人”），可收集并存储本人在注册、使用服务时，所提供的姓名，身份证信息、影像，银行卡信息、影像等相关身份信息以及使用本服务的相关操作及行为信息（如操作记录、设备型号、位置信息）。上述信息是基于相关法律法规的要求，且为保护您的账户安全，用于身份核验。如本人拒绝提供上述信息，被授权人将无法为本人提供本服务，但不影响其为本人提供其他服务。</p><p>2.本人同意并授权，为了保障本人的信息安全，被授权人会在现有技术水平下采取合理必要的措施来保护本人的信息，采取物理、技术和行政管理安全措施来降低丢失、误用、非授权访问、披露和更改的风险，包括但不限于传输层数据加密、防火墙和加密存储、物理访问控制以及信息访问授权控制。为此本服务设置了安全程序保护您的信息不会被未经授权的访问所窃取。在不幸发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们同时将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，主动向监管部门上报个人信息安全事件的处置情况。</p><p>3.本人同意并授权，基于国家相关法律法规的规定，以及为向本人提供服务及提升服务质量、向本人提供安全服务目的时，被授权人可能将收集的本人相关信息用作下列用途：</p><p>（1）基于国家相关主管部门的要求向相关部门进行报告；</p><p>（2）在本人使用本服务时，被授权人将本人的信息用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途，确保被授权人提供的产品和服务的安全性；</p><p>（3）经本人授权的其他用途。</p><p> </p><p>授权人声明：</p><p>本授权书是本人向被授权人做出的单方承诺，效力具有独立性。</p><p>若本人与被授权人发生任何纠纷或争议，首先应友好协商解决；协商不成的，本人同意将纠纷或争议提交本授权书签订地（即中国浙江省杭州区萧山区）有管辖权的人民法院管辖。本授权书的成立、生效、 履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。</p><p>本人已知悉本授权书所有内容（特别是加粗字体内容）的意义以及由此产生的法律效力，自愿作出上述授权，本授权书是本人真实的意思表示，本人同意承担由此带来的一切法律后果。</p><p>特此授权！</p>';
</script>

<style lang="scss" scoped>
  .rich-text {
    width: 100%;
    box-sizing: border-box;
    padding: 24rpx 24rpx 180rpx;
  }
</style>
