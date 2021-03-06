import Vue from 'vue'
import {accMul,accAdd,guid,formatDateHtml,tenThousandFormatHtml} from '@/assets/common.js'

import formselectinsurance from '@/assets/form/control/formselectinsurance/formselectinsurance.js'
Vue.use(formselectinsurance)

import faceValue from '@/assets/faceValue/faceValue.js'
Vue.use(faceValue)

import datebox from '@/assets/control/datebox/datebox.js'
Vue.use(datebox)
import dateboxinterval from '@/assets/control/dateboxinterval/dateboxinterval.js'
Vue.use(dateboxinterval)
import datePanel from '@/assets/control/datePanel/datePanel.js'
Vue.use(datePanel)

import flows from '@/assets/form/flows/flows.js'
Vue.use(flows)

import schedule from '@/assets/form/schedule/schedule.js'
Vue.use(schedule)

import textbox from '@/assets/control/textbox/textbox.js'
Vue.use(textbox)

import viewbody from '@/assets/view/viewbody/viewbody.js'
Vue.use(viewbody)
import viewlistblock from '@/assets/view/viewlistblock/viewlistblock.js'
Vue.use(viewlistblock)
import viewpsd from '@/assets/view/viewpsd/viewpsd.js'
Vue.use(viewpsd)

import viewcontrol from '@/assets/view/viewcontrol/viewcontrol.js'
Vue.use(viewcontrol)

import viewimage from '@/assets/view/viewimage/viewimage.js'
Vue.use(viewimage)

import viewtab from '@/assets/view/viewtab/viewtab.js'
Vue.use(viewtab)
import viewtabcontent from '@/assets/view/viewtabcontent/viewtabcontent.js'
Vue.use(viewtabcontent)
import viewtablist from '@/assets/view/viewtablist/viewtablist.js'
Vue.use(viewtablist)
import viewtabbutton from '@/assets/view/viewtabbutton/viewtabbutton.js'
Vue.use(viewtabbutton)


import viewtextmoney from '@/assets/view/viewtextmoney/viewtextmoney.js'
Vue.use(viewtextmoney)

import viewdatemoney from '@/assets/view/viewdatemoney/viewdatemoney.js'
Vue.use(viewdatemoney)


import viewimg from '@/assets/view/viewimg/viewimg.js'
Vue.use(viewimg)

import viewshowfiles from '@/assets/view/viewshowfiles/viewshowfiles.js'
Vue.use(viewshowfiles)

import tabletip from '@/assets/control/tabletip/tabletip.js'
Vue.use(tabletip)

import formtab from '@/assets/formtab/formtab.js'
Vue.use(formtab)

import formdatebox from '@/assets/form/control/formdatebox/formdatebox.js'
Vue.use(formdatebox)

import formshowtable from '@/assets/form/formshowtable/formshowtable.js'
Vue.use(formshowtable)

import previewSms from '@/assets/form/preview/previewSms.js'
Vue.use(previewSms)

import formdateboxinterval from '@/assets/form/control/formdateboxinterval/formdateboxinterval.js'
Vue.use(formdateboxinterval)

import formtextbox from '@/assets/form/control/formtextbox/formtextbox.js'
Vue.use(formtextbox)

import formtextsearch from '@/assets/form/control/formtextsearch/formtextsearch.js'
Vue.use(formtextsearch)

import formuploadimage from '@/assets/form/control/formuploadimage/formuploadimage.js'
Vue.use(formuploadimage)

import formtdtextbox from '@/assets/form/td/formtdtextbox/formtdtextbox.js'
Vue.use(formtdtextbox)
import formtduploadimage from '@/assets/form/td/formtduploadimage/formtduploadimage.js'
Vue.use(formtduploadimage)
import formtddelete from '@/assets/form/td/formtddelete/formtddelete.js'
Vue.use(formtddelete)
import formtextarea from '@/assets/form/control/formtextarea/formtextarea.js'
Vue.use(formtextarea)
import formzhtextboxtwo from '@/assets/form/control/zh/formzhtextboxtwo/formzhtextboxtwo.js'
Vue.use(formzhtextboxtwo)
import formzhtextboxthree from '@/assets/form/control/zh/formzhtextboxthree/formzhtextboxthree.js'
Vue.use(formzhtextboxthree)

import formimgbox from '@/assets/form/control/formimgbox/formimgbox.js'
Vue.use(formimgbox)

import formzhselecttextmore from '@/assets/form/control/zh/formzhselecttextmore/formzhselecttextmore.js'
Vue.use(formzhselecttextmore)

import formzhpurview from '@/assets/form/control/zh/formzhpurview/formzhpurview.js'
Vue.use(formzhpurview)
import formzhselecttext from '@/assets/form/control/zh/formzhselecttext/formzhselecttext.js'
Vue.use(formzhselecttext)

import formzhtextcheckbox from '@/assets/form/control/zh/formzhtextcheckbox/formzhtextcheckbox.js'
Vue.use(formzhtextcheckbox)


import formzhtextmorecheckbox from '@/assets/form/control/zh/formzhtextmorecheckbox/formzhtextmorecheckbox.js'
Vue.use(formzhtextmorecheckbox)

import formimage from '@/assets/form/control/formimage/formimage.js'
Vue.use(formimage)
import previewimage from '@/assets/manager/previewimage/previewimage.js'
Vue.use(previewimage)
import tree from '@/assets/tree/tree.js'
Vue.use(tree)
import radiobutton from '@/assets/control/radiobutton/radiobutton.js'
Vue.use(radiobutton)
import select from '@/assets/control/select/select.js'
Vue.use(select)
import formtddatebox from '@/assets/form/td/formtddatebox/formtddatebox.js'
Vue.use(formtddatebox)
import formtdradio from '@/assets/form/td/formtdradio/formtdradio.js'
Vue.use(formtdradio)
import formtdselect from '@/assets/form/td/formtdselect/formtdselect.js'
Vue.use(formtdselect)
import formtdcheckbox from '@/assets/form/td/formtdcheckbox/formtdcheckbox.js'
Vue.use(formtdcheckbox)
import formtdselectdialog from '@/assets/form/td/formtdselectdialog/formtdselectdialog.js'
Vue.use(formtdselectdialog)

import managertdthisexter from '@/assets/manager/td/managertdthisexter/managertdthisexter.js'
Vue.use(managertdthisexter)

import managertdinput from '@/assets/manager/td/managertdinput/managertdinput.js'
Vue.use(managertdinput)

import managertdstate from '@/assets/manager/td/managertdstate/managertdstate.js'
Vue.use(managertdstate)

import managertddirection from '@/assets/manager/td/managertddirection/managertddirection.js'
Vue.use(managertddirection)
import managertdrgt from '@/assets/manager/td/managertdrgt/managertdrgt.js'
Vue.use(managertdrgt)

import managertdlogo from '@/assets/manager/td/managertdlogo/managertdlogo.js'
Vue.use(managertdlogo)
import managertdcenter from '@/assets/manager/td/managertdcenter/managertdcenter.js'
Vue.use(managertdcenter)

import managertdleaveword from '@/assets/manager/td/managertdleaveword/managertdleaveword.js'
Vue.use(managertdleaveword)
import managertdcenterhtml from '@/assets/manager/td/managertdcenterhtml/managertdcenterhtml.js'
Vue.use(managertdcenterhtml)
import managertddate from '@/assets/manager/td/managertddate/managertddate.js'
Vue.use(managertddate)
import managertdhtml from '@/assets/manager/td/managertdhtml/managertdhtml.js'
Vue.use(managertdhtml)

import managertdicontxtcolor from '@/assets/manager/td/managertdicontxtcolor/managertdicontxtcolor.js'
Vue.use(managertdicontxtcolor)

import managertdmoney from '@/assets/manager/td/managertdmoney/managertdmoney.js'
Vue.use(managertdmoney)
import managertdlook from '@/assets/manager/td/managertdlook/managertdlook.js'
Vue.use(managertdlook)
import managertd from '@/assets/manager/td/managertd/managertd.js'
Vue.use(managertd)
import managertdcheckbox from '@/assets/manager/td/managertdcheckbox/managertdcheckbox.js'
Vue.use(managertdcheckbox)
import managertdimage from '@/assets/manager/td/managertdimage/managertdimage.js'
Vue.use(managertdimage)
import managertdpsd from '@/assets/manager/td/managertdpsd/managertdpsd.js'
Vue.use(managertdpsd)
import managertdyesno from '@/assets/manager/td/managertdyesno/managertdyesno.js'
Vue.use(managertdyesno)
import managertdoperate from '@/assets/manager/td/managertdoperate/managertdoperate.js'
Vue.use(managertdoperate)
import managertdoperatebutton from '@/assets/manager/td/managertdoperatebutton/managertdoperatebutton.js'
Vue.use(managertdoperatebutton)

import managertdoperatedelete from '@/assets/manager/td/managertdoperatedelete/managertdoperatedelete.js'
Vue.use(managertdoperatedelete)
import managertdoperatecustomize from '@/assets/manager/td/managertdoperatecustomize/managertdoperatecustomize.js'
Vue.use(managertdoperatecustomize)
import managertdtipimg from '@/assets/manager/td/managertdtipimg/managertdtipimg.js'
Vue.use(managertdtipimg)
import managertdcheckboxshow from '@/assets/manager/td/managertdcheckboxshow/managertdcheckboxshow.js'
Vue.use(managertdcheckboxshow)
import managertdimgself from '@/assets/manager/td/managertdimgself/managertdimgself.js'
Vue.use(managertdimgself)

import managertdimg from '@/assets/manager/td/managertdimg/managertdimg.js'
Vue.use(managertdimg)


import upload from '@/assets/control/upload/upload.js'
Vue.use(upload)
import Dialog from '@/assets/dialog/dialog.js'
Vue.use(Dialog)
import pagination from '@/assets/pagination/pagination.js'
Vue.use(pagination)
import managercolortip from '@/assets/managercolortip/managercolortip.js'
Vue.use(managercolortip)
import request from '@/assets/ajax/request.js'
Vue.use(request)
import radiofilter from '@/assets/radiofilter/radiofilter.js'
import radiofilterletter from '@/assets/radiofilterletter/radiofilterletter.js'
import searchfilter from '@/assets/searchfilter/searchfilter.js'
Vue.use(radiofilter)
Vue.use(radiofilterletter)
Vue.use(searchfilter)

import radiofilterdate from '@/assets/radiofilterdate/radiofilterdate.js'
Vue.use(radiofilterdate)

import radiofilterday from '@/assets/radiofilterday/radiofilterday.js'
Vue.use(radiofilterday)

import selectbody from '@/assets/selectbody/selectbody.js'
Vue.use(selectbody)


import formselectbox from '@/assets/formselectbox/formselectbox.js'
Vue.use(formselectbox)

import selectrgtbox from '@/assets/selectrgtbox/selectrgtbox.js'
Vue.use(selectrgtbox)

import formradiobutton from '@/assets/formradiobutton/formradiobutton.js'
Vue.use(formradiobutton)
import formcheckbox from '@/assets/formcheckbox/formcheckbox.js'
Vue.use(formcheckbox)
import formupload from '@/assets/formupload/formupload.js'
Vue.use(formupload)
import formdropdownselect from '@/assets/formdropdownselect/formdropdownselect.js'
Vue.use(formdropdownselect)
import managersearch from '@/assets/managersearch/managersearch.js'
Vue.use(managersearch)
import commonbutton from '@/assets/commonbutton/commonbutton.js'
Vue.use(commonbutton)
import managerth from '@/assets/managerth/managerth.js'
Vue.use(managerth)

import managerthcheck from '@/assets/manager/th/managerthcheck/managerthcheck.js'
Vue.use(managerthcheck)

import dialogbutton from '@/assets/dialogbutton/dialogbutton.js'
Vue.use(dialogbutton)

import titlenumimagecolor from '@/assets/makeup/titlenumimagecolor/titlenumimagecolor.js'
Vue.use(titlenumimagecolor)
import managerpage from '@/assets/manager/managerpage/managerpage.js'
Vue.use(managerpage)
import manageremptypage from '@/assets/manager/manageremptypage/manageremptypage.js'
Vue.use(manageremptypage)

import formbody from '@/assets/form/formbody/formbody.js'
Vue.use(formbody)
import formlistbody from '@/assets/form/formlistbody/formlistbody.js'
Vue.use(formlistbody)

import formlistedit from '@/assets/form/formlistedit/formlistedit.js'
Vue.use(formlistedit)
import formlistshow from '@/assets/form/formlistshow/formlistshow.js'
Vue.use(formlistshow)

import formoperate from '@/assets/form/formoperate/formoperate.js'
Vue.use(formoperate)

import formprivilege from '@/assets/form/formprivilege/formprivilege.js'
Vue.use(formprivilege)

import formprivilegedetails from '@/assets/form/formprivilege/formprivilegedetails.js'
Vue.use(formprivilegedetails)

import formselectboxmore from '@/assets/formselectboxmore/formselectboxmore.js'
Vue.use(formselectboxmore)
import validator from '@/assets/validator/validator.js'
Vue.use(validator)

import selecttree from '@/assets/tree/selecttree/selecttree.js'
Vue.use(selecttree)


import "@/assets/iconfont/style.css"
import "@/assets/iconfontmore/iconfont.css"
import "@/assets/customevent.js"
