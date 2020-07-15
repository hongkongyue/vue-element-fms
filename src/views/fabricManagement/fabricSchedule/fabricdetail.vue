<template>
    <div>
        <!-- 数据列表 -->
        <Row :style="{minHeight:showBink?'830px':'620px'}" class="background-color-white exhibition" style="min-height:630px;padding-left:0px">
             <Form :model="formSearch" class="search" ref="formSearch" :label-width="80" inline label-position="right" :rules="rules" @keydown.native.enter.prevent="search">
                    <Form-item label="" :label-width='40'>
                      <el-button type="primary" size="small" @click="getIn">录入</el-button>
                    </Form-item>
            </Form>
            <el-table :data="list" size="mini" style="width: 100%"  border tooltip-effect="dark" max-height="350" @selection-change="handleSelectionChange">
            <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
            <el-table-column prop="taskNo"            label="开发任务编号" min-width="90" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="processStatus"     label="流程状态" align="center" min-width="80" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="initiateUserName"   label="发起人"     min-width="90" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="initiateDepartmentName"      label="发起部门"       min-width="80" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="majorClasses" label="物料类型"       min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="kinds"      label="品类分类" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="specialCategory"              label="是否特殊工艺"   min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.specialCategory == 1 ? '是' : '否'}}</template>
            </el-table-column>
            <el-table-column prop="styleImg"               label="样品图1"        min-width="80" align="center" show-overflow-tooltip>
                 <template slot-scope="scope">
                        <span>
                              <!-- <img v-if="scope.row.materialImg" :src="scope.row.materialImg" style="width:40px;height:40px" />
                              <img v-else  :src="noPict"> -->
                                <div v-if="scope.row.styleImg" class="demo-image__preview">
                                    <el-image  @click.native="getLargePict(scope.row.styleImg)"
                                        style="width: 40px; height: 40px"
                                        :src="scope.row.styleImg" 
                                        :preview-src-list="[scope.row.styleImg]">
                                    </el-image>
                                </div>
                                 <div v-if="!scope.row.styleImg" >
                                    <el-image style="width: 40px; height: 40px" :src = noPict></el-image>
                                </div>
                        </span>
                </template>
            </el-table-column>
            <el-table-column prop="styleImg2"       label="样图2"           min-width="80" align="center" show-overflow-tooltip>
                   <template slot-scope="scope">
                        <span>
                              <!-- <img v-if="scope.row.materialImg" :src="scope.row.materialImg" style="width:40px;height:40px" />
                              <img v-else  :src="noPict"> -->
                                <div v-if="scope.row.styleImg2" class="demo-image__preview">
                                    <el-image  @click.native="getLargePict(scope.row.styleImg2)"
                                        style="width: 40px; height: 40px"
                                        :src="scope.row.styleImg2" 
                                        :preview-src-list="[scope.row.styleImg2]">
                                    </el-image>
                                </div>
                                 <div v-if="!scope.row.styleImg2" >
                                    <el-image style="width: 40px; height: 40px" :src = noPict></el-image>
                                </div>
                        </span>
                </template>
            </el-table-column>
            <el-table-column prop="realMaterial" label="是否有实物" min-width="90" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.realMaterial == 1 ? '是' : '否'}}</template>
            </el-table-column>
            <el-table-column prop="contrastColor" label="是否撞色" min-width="150" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.contrastColor == 1 ? '是' : '否'}}</template>
            </el-table-column>
            <el-table-column prop="developer" label="开发员" min-width="150" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="submitTime" label="提交日期" min-width="80" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="requireDate" label="要求完成日期" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="sendInspectDate" label="送检日期" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="inspectResult" label="检测结果" min-width="140" align="center" show-overflow-tooltip>
                  <template slot-scope="scope">
                        <span>{{scope.row.inspectResult==1?'合格':'不合格'}} </span>
                </template>
            </el-table-column>
            <el-table-column prop="inspectUser" label="检测人员" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="inspectTime" label="检测时间" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="price" label="核准价格（元/米）" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="remark" label="备注" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="pricingUser" label="核价人员" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="pricingTime" label="核价时间" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
    
        <Row style="margin-top:30px">
        <!-- <Table size="small" :columns="columnsTwo" highlight-row :data="dataTwwo"></Table> -->
        <el-table  :data="tableData" size="mini" style="width: 100%"  border tooltip-effect="dark" max-height="350" >
            <el-table-column type="index" width="55" label="序号" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="materialImg" label="图片" min-width="60" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                        <span>
                              <!-- <img v-if="scope.row.materialImg" :src="scope.row.materialImg" style="width:40px;height:40px" />
                              <img v-else  :src="noPict"> -->
                                <div v-if="scope.row.materialImg" class="demo-image__preview">
                                    <el-image  @click.native="getLargePict(scope.row.materialImg)"
                                        style="width: 40px; height: 40px"
                                        :src="scope.row.materialImg" 
                                        :preview-src-list="[scope.row.materialImg]">
                                    </el-image>
                                </div>
                                <div v-if="!scope.row.materialImg" >
                                    <el-image style="width: 40px; height: 40px" :src = noPict></el-image>
                                </div>
                        </span>
                </template>
            </el-table-column>
            <el-table-column prop="materialYear" label="年份" align="center" min-width="80" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="materialMonth" label="月份" min-width="80" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="basicSupplierShortName" label="供应商简称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="supplierMaterialNo" label="供应商物料编号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="supplierMaterialColorNo" label="供应商物料色号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="materialNo" label="物料编号" min-width="90" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="materialName" label="物料名称" min-width="90" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="basicColorName" label="颜色" min-width="90" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="fabricWidth" label="门幅（cm）" min-width="90" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="fabricWeight" label="克重（g/m2)" min-width="150" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="unit" label="单位" min-width="150" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="ingredient" label="成分" min-width="80" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="moq" label="起订量" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="firstMaterialType" label="一级分类" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="twiceMaterialType" label="二级分类" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="thirdMaterialType" label="三级分类" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="materialSpecification" label="物料规格" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="loss" label="默认损耗（%）" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="loopedWeft" label="纬缩(%)" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="knees" label="经缩(%)" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="productCycle" label="生产周期" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="orderCycle" label="订货周期" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="kilogramsOfRice" label="公斤米数" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="remark" label="备注" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="riskRemark" label="质量风险提示" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="developer" label="开发人" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
              <el-table-column prop="enterTime" label="录入时间" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
             <el-table-column prop="materialUser" label="面料员" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column  prop="materialEnterTime" label="面料录入时间" min-width="140" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <!-- A类开发录入 -->
        <Modal v-model="aVisible" :styles="mystyle"  title="录入" @on-cancel='cancelAforms' :width="1010"  class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleFormA" :model="aformData" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="arules">
                <Col>
                    <el-form-item label="年份：" size="small" label-width="140px" >
                        <el-input  v-model="aformData.year"  style="width:160px" readonly :disabled="true" ></el-input>
                    </el-form-item>
                    <el-form-item label="月份：" size="small" label-width="140px">
                        <el-input v-model="aformData.month" maxlength="160" style="width:160px"  readonly   :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="样品来源" size="small" label-width="140px">
                        <el-input v-model="aformData.yply" maxlength="160" style="width:160px"  readonly   :disabled="true"></el-input>
                    </el-form-item>
                     
                </Col>
                <Col>
                <el-form-item label="供应商简称" size="small" label-width="140px" prop="basicSupplierShortName">
                        <el-select v-model="aformData.basicSupplierShortName" placeholder="请选择" style="width:160px" filterable >
                             <el-option v-for="v in basicSupplierShortNameList" :key="v.id" :label="v.shortName" :value="v.id"></el-option>
                       </el-select>
                    </el-form-item>
                    <el-form-item label="供应商物料编号" size="small" label-width="140px" prop="supplierMaterialNo">
                        <el-input v-model="aformData.supplierMaterialNo" maxlength="160" style="width:160px"   ></el-input>
                    </el-form-item>
                    <el-form-item label="供应商物料色号" size="small" label-width="140px" prop="supplierMaterialColorNo">
                        <el-input v-model="aformData.supplierMaterialColorNo" maxlength="160" style="width:160px" ></el-input>
                    </el-form-item>
                </Col>
                <Col>
                <el-form-item label="颜色：" size="small" label-width="140px" prop="color">
                         <el-select v-model="aformData.color" @change="changeColor(aformData.color)" placeholder="请选择" style="width:160px" filterable>
                             <el-option v-for="v in colorList" :key="v.colorName" :label="v.colorName" :value="v.colorName"></el-option>
                       </el-select>
                    </el-form-item>
                    <el-form-item label="物料名称：" size="small" label-width="140px" prop="name">
                        <el-input v-model="aformData.name" maxlength="120" style="width:160px"></el-input>
                    </el-form-item>
                    <el-form-item label="物料规格：" size="small" label-width="140px" prop="sku">
                        <el-input  v-model="aformData.sku"   style="width:160px" ></el-input>
                    </el-form-item>
                </Col>
                 <Col>
                  <el-form-item label="一级分类/二级分类/三级分类：" size="small" label-width="240px" prop="one">
                       <el-cascader v-model="aformData.one" ref="cascader" style="width:370px" size="small" filterable placeholder="一级分类/二级分类/三级分类" :options="oneList" :props="optionProps"></el-cascader>
                    </el-form-item>
                  <!-- <el-form-item label="一级分类：" size="small" label-width="140px" prop="first">
                        <el-select v-model="aformData.first" placeholder="请选择" style="width:160px" filterable @change="getSelectMaterialType(2,aformData.first)">
                             <el-option v-for="v in firstLevelList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                       </el-select>
                    </el-form-item>
                    <el-form-item label="二级分类:" size="small" label-width="140px" prop="second">
                          <el-select v-model="aformData.second" placeholder="请选择" style="width:160px" filterable @change="getSelectMaterialType(3,aformData.second)">
                             <el-option v-for="v in secondLevelList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                       </el-select>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="三级分类：" size="small" label-width="140px" prop="third">
                       <el-select v-model="aformData.third" placeholder="请选择" style="width:160px" filterable>
                           <el-option v-for="v in thirdLevelList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                       </el-select>
                    </el-form-item> -->

                    
                </Col>
                <Col>
                <el-form-item label="门幅(cm)：" size="small" label-width="140px" prop="fabricWidth">
                         <el-input  v-model="aformData.fabricWidth"   style="width:160px" ></el-input>
                    </el-form-item>
                    <el-form-item label="克重（g/m2)：" size="small" label-width="140px" prop="fabricWeight">
                        <el-input v-model="aformData.fabricWeight" maxlength="120" style="width:160px"></el-input>
                    </el-form-item>
                    <el-form-item label="单位：" size="small" label-width="140px" prop="unit">
                        <el-select v-model="aformData.unit" placeholder="请选择" style="width:160px" filterable>
                           <el-option v-for="v in unitList" :key="v" :label="v" :value="v"></el-option>
                       </el-select>
                    </el-form-item>
                </Col>
                <Col>
                <el-form-item label="成分：" size="small" label-width="140px" prop="ingredient">
                         <el-input  v-model="aformData.ingredient"   style="width:160px" ></el-input>
                    </el-form-item>
                    <el-form-item label="起订量：" size="small" label-width="140px" prop="moq">
                        <el-input v-model="aformData.moq" maxlength="120" style="width:160px"></el-input>
                    </el-form-item>
                    <el-form-item label="默认损耗（%）：" size="small" label-width="140px">
                        <el-input v-model="aformData.loss" maxlength="120" style="width:160px"></el-input>
                    </el-form-item>
                </Col>
                <Col>
                <el-form-item label="纬缩(%)：" size="small" label-width="140px">
                         <el-input  v-model="aformData.loopedWeft"   style="width:160px" ></el-input>
                    </el-form-item>
                    <el-form-item label="经缩(%)：" size="small" label-width="140px">
                        <el-input v-model="aformData.knees" maxlength="120" style="width:160px"></el-input>
                    </el-form-item>
                    <el-form-item label="生产周期：" size="small" label-width="140px">
                        <el-input v-model="aformData.productCycle" maxlength="120" style="width:160px"></el-input>
                    </el-form-item>
                </Col>
                <Col>
                <el-form-item label="订货周期：" size="small" label-width="140px" >
                         <el-input  v-model="aformData.orderCycle"   style="width:160px" ></el-input>
                    </el-form-item>
                    <el-form-item label="公斤米数：" size="small" label-width="140px" >
                        <el-input v-model="aformData.kilogramsOfRice" maxlength="120" style="width:160px"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：" size="small" label-width="140px">
                        <el-input v-model="aformData.remark" maxlength="120" style="width:160px"></el-input>
                    </el-form-item>
                </Col>
                <Col>
                    <el-form-item label="质量风险提示：" size="small" label-width="140px" >
                        <el-input  v-model="aformData.riskRemark"  style="width:160px" maxlength="50" ></el-input>
                    </el-form-item>
                    <span style="color:red;position:absolute;left:322px;top:10px">*</span>
                    <el-form-item label="图片：" size="small" label-width="75px" >
                         <!-- <el-button type="primary" size="small" @click="getIn">上传图片</el-button> -->
                           <Upload 
                                                    ref="upload"
                                                    name="file"
                                                    :max-size="4096"
                                                    :headers="authentic"
                                                    :show-upload-list="false"
                                                    :before-upload="handleUpload"
                                                    :on-success="uploadSuccess"
                                                    :on-error="uploadError"
                                                    action="/eop-boot/masterData/ossFileAddress/upload"
                                                    :data="{fileName:Filename,className:1}"
                                                            >
                                                    <Button type="primary"        icon="ios-cloud-upload-outline" style="width: 100px">上传图片</Button>
                                          </Upload>
                                          <!-- <Button v-if="dealshowFilelist.length>0" type="primary" @click="tip" icon="ios-cloud-upload-outline" style="width: 100px">上传图片</Button> -->
                    </el-form-item>
                    <el-form-item label="" size="small" label-width="95px" prop="taskRank">
                         <img v-if="this.imgShowUrl" :src="this.imgShowUrl" style="width:100px;height:100px"/>
                    </el-form-item>
                </Col>
                <Col style="positive:">
                    
                </Col>
                <!-- <el-form-item style="padding-left:330px">
                    
                </el-form-item> -->
            </el-form>
        </Row>
        <div slot="footer">
            <Button type="primary" @click="submitAforms">确认</Button>
                    <Button type="default" @click="cancelAforms">取消</Button>
        </div>
    </Modal>
    <!-- 其它开发录入 -->
        <Modal v-model="dialogVisible" :styles="mystyle"  title="录入" @on-cancel='cancel' :width="810"  class-name="customize-modal-center">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="formData" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col>
                    <el-form-item label="年份：" size="small" label-width="55px" >
                        <el-input  v-model="formData.year"  style="width:160px" readonly :disabled="true" ></el-input>
                    </el-form-item>
                    <el-form-item label="月份：" size="small" label-width="75px" prop="taskRank">
                        <el-input v-model="formData.month" maxlength="160" style="width:160px"  readonly   :disabled="true"></el-input>
                    </el-form-item>
                     <!-- <el-form-item label="物料编号：" size="small" label-width="95px" prop="numbercode">
                        <el-input disabled v-model="formData.taskRank" maxlength="160"  style="width:160px"  show-word-limit></el-input>
                    </el-form-item> -->
                     <el-form-item label="颜色：" size="small" label-width="75px" prop="color">
                         <el-select v-model="formData.color" @change="changeColor(formData.color)" placeholder="请选择" style="width:140px" filterable>
                             <el-option v-for="v in colorList" :key="v.colorName" :label="v.colorName" :value="v.colorName"></el-option>
                       </el-select>
                         <!-- <el-input  v-model="formData.color" @blur="colorNoBlur(formData.color)"  style="width:185px"></el-input> -->
                    </el-form-item>
                </Col>
                 <Col>
                  <el-form-item label="一级分类：" size="small" label-width="95px" prop="first">
                        <el-select v-model="formData.first" placeholder="请选择" style="width:140px" filterable @change="getSelectMaterialType(2,formData.first)">
                             <el-option v-for="v in firstLevelList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                       </el-select>
                    </el-form-item>
                    <el-form-item label="二级分类:" size="small" label-width="90px" prop="second">
                          <el-select v-model="formData.second" placeholder="请选择" style="width:140px" filterable @change="getSelectMaterialType(3,formData.second)">
                             <el-option v-for="v in secondLevelList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                       </el-select>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="三级分类：" size="small" label-width="95px" prop="third">
                       <el-select v-model="formData.third" placeholder="请选择" style="width:150px" filterable>
                           <el-option v-for="v in thirdLevelList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                       </el-select>
                    </el-form-item>
                </Col>
                <Col>
                    <el-form-item label="物料名称：" size="small" label-width="95px" prop="name">
                        <el-input v-model="formData.name" maxlength="120" style="width:140px"></el-input>
                    </el-form-item>
                    <el-form-item label="物料规格：" size="small" label-width="95px" prop="sku">
                        <el-input  v-model="formData.sku"   style="width:140px" ></el-input>
                    </el-form-item>
                    <el-form-item label="质量风险提示：" size="small" label-width="115px" prop="remark">
                        <el-input  v-model="formData.remark"  style="width:125px" maxlength="50" ></el-input>
                    </el-form-item>
                </Col>
                <Col style="positive:">
                    <span style="color:red;position:absolute;left:10px;top:10px">*</span>
                    <el-form-item label="图片：" size="small" label-width="75px" >
                         <!-- <el-button type="primary" size="small" @click="getIn">上传图片</el-button> -->
                           <Upload 
                                                    ref="upload"
                                                    name="file"
                                                    :max-size="4096"
                                                    :headers="authentic"
                                                    :show-upload-list="false"
                                                    :before-upload="handleUpload"
                                                    :on-success="uploadSuccess"
                                                    :on-error="uploadError"
                                                    action="/eop-boot/masterData/ossFileAddress/upload"
                                                    :data="{fileName:Filename,className:1}"
                                                            >
                                                    <Button type="primary"        icon="ios-cloud-upload-outline" style="width: 100px">上传图片</Button>
                                          </Upload>
                                          <!-- <Button v-if="dealshowFilelist.length>0" type="primary" @click="tip" icon="ios-cloud-upload-outline" style="width: 100px">上传图片</Button> -->
                    </el-form-item>
                    <el-form-item label="" size="small" label-width="95px" prop="taskRank">
                         <img v-if="this.imgShowUrl" :src="this.imgShowUrl" style="width:100px;height:100px"/>
                    </el-form-item>
                </Col>
            </el-form>
        </Row>
        <div slot="footer">
            <Button type="primary" @click="submitForms('ruleForm')">确认</Button>
                    <Button type="default" @click="cancel">取消</Button>
        </div>
    </Modal>
    </Row>
    </Row>
         
    </div>
</template>

<script>
    import {debounce} from 'mixins/debounce'
    import {burypoint} from 'mixins/burypoint'
export default {
    mixins:[debounce,burypoint],
        data() {
            return {
                unitList:[],
                basicSupplierShortNameList:[],
                aVisible:false,
                aformData:{
                   year:new Date().getFullYear(),
                    month:new Date().getMonth()+1,
                    yply:'A类开发',
                    basicSupplierShortName:'',
                    supplierMaterialNo:'',
                    supplierMaterialColorNo:'',
                    color:'',
                    name:'',
                    sku:'',
                    first:'',
                    second:'',
                    one:[],
                    fabricWidth:'',
                    fabricWeight:'',
                    unit:'',
                    ingredient:'',
                    moq:'',
                    loss:'',
                    loopedWeft:'',
                    knees:'',
                    productCycle:'',
                    orderCycle:'',
                    kilogramsOfRice:'',
                    remark:'',
                    riskRemark:'',
                },
                arules:{
                       basicSupplierShortName: [
                              { required: true, message: '请选择', trigger: 'change' }
                        ],
                        supplierMaterialNo: [
                               { required: true, message: '请输入', trigger: 'blur' }
                        ],
                         supplierMaterialColorNo: [
                               { required: true, message: '请输入', trigger: 'blur' }
                        ],
                        color: [
                               { required: true, message: '请选择', trigger: 'change' }
                        ],
                        sku: [
                              { required: true, message: '请输入', trigger: 'blur' }
                        ],
                        name: [
                              { required: true, message: '请输入', trigger: 'blur' }
                        ],
                        first: [
                               { required: true, message: '请选择', trigger: 'change' }
                        ],
                        second: [
                               { required: true, message: '请选择', trigger: 'change' }
                        ],
                        one: [
                               { required: true, message: '请选择', trigger: 'change' }
                        ],
                        fabricWidth: [
                              { required: true, message: '请输入', trigger: 'blur' }
                        ],
                        fabricWeight: [
                              { required: true, message: '请输入', trigger: 'blur' }
                        ],
                        unit: [
                               { required: true, message: '请选择', trigger: 'change' }
                        ],
                         ingredient: [
                              { required: true, message: '请输入', trigger: 'blur' }
                        ],
                        moq: [
                              { required: true, message: '请输入', trigger: 'blur' }
                        ],
                },
                changeColorId:'',
                colorList:[],
                noPict:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562574299&di=846b4c904bd54d3c3821fa5938888c69&src=http://hbimg.b0.upaiyun.com/bdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658',
                value1:'',
                imgShowUrl:'',
                materialImg:'',
                visible: false,
                red_packet_table_row_index:-1,
                list:[],
                authentic:{
                       'X-AUTH-TOKEN' :window.sessionStorage.getItem('token')
                },
                url:'',
                file:null,
                Filename:null,
                srcList:[],
                dealshowFilelist:[],
                changeVisible:false,
                dialogVisible:false,
                tableData:[],
                formSearch:{},
                supplierMaterialColorNo:'',//色系
                formData:{
                         year:new Date().getFullYear(),
                         month:new Date().getMonth()+1,
                         color:'',
                         colorName:'',
                         name:'',
                         first:'',
                         second:'',
                         third:'',
                         sku:'',
                         remark:'',
                },
                userInfo: {},
                firstLevelList:[],
                secondLevelList:[],
                thirdLevelList:[],
                total: 0,
                page: 1,
                pageSize: 10,
                rules:{
                       numbercode: [
                              { required: true, message: '请输入', trigger: 'blur' },
                        ],
                        color: [
                               { required: true, message: '请输入', trigger: 'blur' }
                        ],
                         name: [
                               { required: true, message: '请输入', trigger: 'blur' }
                        ],
                        first: [
                               { required: true, message: '请选择', trigger: 'change' }
                        ],
                        second: [
                               { required: true, message: '请选择', trigger: 'change' }
                        ],
                        third: [
                               { required: true, message: '请选择', trigger: 'change' }
                        ],
                        sku: [
                              { required: true, message: '请输入', trigger: 'blur' }
                        ],
                         pict: [
                              { required: true, message: '请输入', trigger: 'blur' }
                        ],
                },
                oneList:[],
                optionProps: {
                value: 'text',
                label: 'text',
                children: 'children'
            },
            }
        },
        destroyed(){
              this.tableData=[]
        },
        mounted() {
                this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo')); 
                this.getTableData()
                this.getData() 
                this.getSelectMaterialType(1)
                this.getColorList()
                this.getSupplierList()
                this.getUnitList()
                this.getTreeList()
        },
        methods: {
            getTreeList(){ //
             this.request('fabric_getFabricStyleTree', {}, false).then((res) => {
                            if(res.code==1){
                                let arr = res.data.children
                    this.oneList = this.deleteChildren(arr)
                              }
                            })    
            },
            //遍历树结构，当节点的children为空时，删除children
        deleteChildren(arr) {
            let childs = arr
            for (let i = childs.length; i--; i > 0) {
                if (childs[i].children) {
                    if (childs[i].children.length) {
                        this.deleteChildren(childs[i].children)
                    } else {
                        delete childs[i].children
                    }
                }
            }
            return arr
        },
            getUnitList(){
                this.request('masterData_basicMeasureUnit_pullDown', {}, false).then((res) => {
                            if(res.code==1){
                                this.unitList = res.data
                              }
                            })    
            },
            getSupplierList(){//
            let data = {}
            data.onlySupplier = true
            this.request('masterData_supplier_selector', data, false).then((res) => {
                            if(res.code==1){
                                let list = []
                                res.data.map((item)=>{
                                    if(!!item.shortName){
                                        list.push(item)
                                    }
                                })
                                this.basicSupplierShortNameList = list
                              }
                            })    
            },
            getColorList(){
                let data = {}
                data.pageSize = 2000
                data.currentPage = 1
                this.request('color_page', data, false).then((res) => {
                            if(res.code==1){
                                this.colorList = res.data.records
                              }
                            })    
            },
            changeColor(name){
                let colorId = ''
                this.colorList.map((item)=>{
                    if(name == item.colorName){
                        colorId = item.id
                    }
                })
                this.changeColorId = colorId
            },
             getIn(){
                 this.setBuryPoint('录入')
                 if(this.tableData[0].sampleSource == 'A类开发'){
                     this.aVisible = true
                    this.aformData.basicSupplierShortName=this.tableData[0].basicSupplierId,
                    this.aformData.supplierMaterialNo=this.tableData[0].supplierMaterialNo,
                    // this.aformData.color=this.tableData[0].basicColorName,
                    this.aformData.supplierMaterialColorNo=this.tableData[0].supplierMaterialColorNo,
                    //赋值有问题
                    this.aformData.one=[this.tableData[0].firstMaterialType,this.tableData[0].twiceMaterialType,this.tableData[0].thirdMaterialType]
                    // this.aformData.second=this.tableData[0].twiceMaterialType,
                    // this.aformData.third=this.tableData[0].thirdMaterialType
                    
                 }else{
                     this.dialogVisible=true
                 }
             },
            submitAforms(){
                let {taskNo,taskDetailId,taskConfigurationId,taskConfigurationName}=this.$route.query
                let name = ''
                this.basicSupplierShortNameList.map((item)=>{
                    if(item.id == this.aformData.basicSupplierShortName){
                        name = item.shortName
                    }
                })
                this.$refs['ruleFormA'].validate((valid) => {
                if (valid) {
                    let data = {}
                    data.taskNo=taskNo //流水号
                          data.materialImg=this.materialImg //图片
                          data.materialYear=this.aformData.year //年
                          data.materialMonth=this.aformData.month //月
                          data.basicColorId=this.changeColorId //颜色ID
                          data.basicColorName=this.aformData.color //颜色
                          data.viewColor= this.aformData.color //颜色组合
                          data.materialName=this.aformData.name //物料名称
                        //   data.materialTypeId=this.aformData.third //三级分类ID
                          data.firstMaterialType=this.aformData.one[0] //一级分类
                          data.twiceMaterialType=this.aformData.one[1] //二级分类
                          data.thirdMaterialType=this.aformData.one[2] //三级分类
                        //   data.thirdMaterialTypeCode=this.getfirstName(4,this.aformData.third) //三级分类编码
                          data.materialSpecification=this.aformData.sku //物料规格
                          data.riskRemark          =this.aformData.riskRemark //质量风险提示
                          data.id                  =this.tableData[0]?this.tableData[0].id:''
                          data.taskDetailId        =taskDetailId //明细ID
                          data.taskConfigurationId  =taskConfigurationId 
                          data.taskConfigurationName=taskConfigurationName
                          data.basicSupplierId = this.aformData.basicSupplierShortName //供应商ID
                          data.basicSupplierShortName = name //供应商简称
                          data.supplierMaterialNo = this.aformData.supplierMaterialNo //供应商物料编号
                          data.supplierMaterialColorNo = this.aformData.supplierMaterialColorNo //供应商物料色号
                          data.fabricWidth = this.aformData.fabricWidth //门幅
                          data.fabricWeight = this.aformData.fabricWeight //克重
                          data.unit = this.aformData.unit //单位
                          data.ingredient = this.aformData.ingredient //成分
                          data.moq = this.aformData.moq //起订量
                          data.loss = this.aformData.loss //%默认损耗
                          data.loopedWeft = this.aformData.loopedWeft //%纬缩
                          data.knees = this.aformData.knees //% 经缩
                          data.productCycle = this.aformData.productCycle //%生产周期生产周期
                          data.orderCycle = this.aformData.orderCycle //%订货周期
                          data.kilogramsOfRice = this.aformData.kilogramsOfRice //公斤米数
                          data.remark = this.aformData.remark //备注
                          if(!data.materialImg)return this.$message.error('图片不能为空')
                           this.request('fabric_developMaterialEnter_submit',data,false).then(res=>{
                               if(res.code==1){
                                      this.cancel()
                                    //    setTimeout(()=>{
                                            this.$root.eventHub.$emit('closePageFromOtherPage', 'fabricdetail');//关闭新增页面
                                    //    },200) 
                                      this.$router.push({
                                                          name:'fabriccomplated',
                                                          query: { 
                                                                 taskNo: taskNo,
                                                                 taskDetailId:taskDetailId
                                                         }
                                                 })
                                    
                               }else{
                                    this.$message.error(res.msg)
                               }
                          })
                } else {
                    return false;
                }
            });
            },
            cancelAforms(){
                this.aVisible=false;
                this.aformData={
                   year:new Date().getFullYear(),
                    month:new Date().getMonth()+1,
                    yply:'A类开发',
                    basicSupplierShortName:'',
                    supplierMaterialNo:'',
                    supplierMaterialColorNo:'',
                    color:'',
                    name:'',
                    sku:'',
                    first:'',
                    second:'',
                    one:[],
                    fabricWidth:'',
                    fabricWeight:'',
                    unit:'',
                    ingredient:'',
                    moq:'',
                    loss:'',
                    loopedWeft:'',
                    knees:'',
                    productCycle:'',
                    orderCycle:'',
                    kilogramsOfRice:'',
                    remark:'',
                    riskRemark:'',
                },
                this.imgShowUrl=''
                this.$refs['ruleFormA'].resetFields();
            },
             getSelectMaterialType(level,parentId){
                      let data={}
                          data.level=level;

                          if(level==2){
                               this.aformData.second=''
                              this.aformData.third=''
                              this.formData.second=''
                              this.formData.third=''
                          }
                          if(level==3){
                               this.formData.third=''
                               this.aformData.third=''
                          }
                          if(level>1){
                             data.parentId=parentId
                          }
                          this.request('materialType_selector',data,false).then(res=>{
                              if(res.code==1){
                                   if(level==1){
                                          this.firstLevelList=res.data
                                          this.secondLevelList=[]
                                          this.thirdLevelList =[]
                                   }else if(level==2){
                                          this.secondLevelList=res.data
                                          this.thirdLevelList =[]
                                   }else if(level==3){
                                          this.thirdLevelList=res.data
                                   }
                              }else{
                                   if(level==1){
                                          this.firstLevelList =[]
                                          this.secondLevelList=[]
                                          this.thirdLevelList =[]
                                   }else if(level==2){
                                          this.secondLevelList=[]
                                          this.thirdLevelList =[]
                                   }else if(level==3){
                                          this.thirdLevelList =[]
                                   }    
                              }
                          })
             },
             getLargePict(url){
                            this.url=url;
                            this.srcList=[url]
             },
             submitRecord(){
                     let {taskNo,taskDetailId,taskConfigurationId,taskConfigurationName}=this.$route.query
                     
                     let  data=this.tableData[0]
                          data.taskNo=taskNo
                          data.materialImg=this.materialImg
                          data.materialYear=this.formData.year
                          data.materialMonth=this.formData.month
                          data.basicColorId=this.changeColorId
                          data.basicColorName=this.formData.color
                          data.viewColor= this.formData.color
                          data.materialName=this.formData.name
                          data.materialTypeId=this.formData.third
                          data.firstMaterialType=this.getfirstName(1,this.formData.first)
                          data.twiceMaterialType=this.getfirstName(2,this.formData.second)
                          data.thirdMaterialType=this.getfirstName(3,this.formData.third)
                          data.thirdMaterialTypeCode=this.getfirstName(4,this.formData.third)
                          data.materialSpecification=this.formData.sku
                          data.riskRemark          =this.formData.remark
                          data.id                  =this.tableData[0]?this.tableData[0].id:''
                          data.taskDetailId        =taskDetailId
                          data.taskConfigurationId  =taskConfigurationId
                          data.taskConfigurationName=taskConfigurationName
                          if(!data.materialImg)return this.$message.error('图片不能为空')
                          this.request('fabric_developMaterialEnter_submit',data,false).then(res=>{
                               if(res.code==1){
                                      this.cancel()
                                    //    setTimeout(()=>{
                                            this.$root.eventHub.$emit('closePageFromOtherPage', 'fabricdetail');//关闭新增页面
                                    //    },200) 
                                      this.$router.push({
                                                          name:'fabriccomplated',
                                                          query: { 
                                                                 taskNo: taskNo,
                                                                 taskDetailId:taskDetailId
                                                         }
                                                 })
                                    
                               }else{
                                    this.$message.error(res.msg)
                               }
                          })
             },
            //          this.aformData.first=this.tableData[0].firstMaterialType,
            //         this.aformData.second=this.tableData[0].twiceMaterialType,
            //         this.aformData.third=this.tableData[0].thirdMaterialType
             getfirstName(type,id){
                  if(type==1){
                      for(let i=0,len=this.firstLevelList.length;i<len;i++){
                          if(this.firstLevelList[i].id==id){
                              return this.firstLevelList[i].name
                          }
                      }
                  }else if(type==2){
                     for(let i=0,len=this.secondLevelList.length;i<len;i++){
                          if(this.secondLevelList[i].id==id){
                              return this.secondLevelList[i].name
                          }
                      } 
                  }else if(type==3){
                       for(let i=0,len=this.thirdLevelList.length;i<len;i++){
                          if(this.thirdLevelList[i].id==id){
                              return this.thirdLevelList[i].name
                          }
                      } 
                  }else if(type==4){
                       for(let i=0,len=this.thirdLevelList.length;i<len;i++){
                          if(this.thirdLevelList[i].id==id){
                              return this.thirdLevelList[i].code
                          }
                      } 
                  }
             },
             resetForm(formName) {
                 this.$refs[formName].resetFields();
             },
             submitForms(formName) {
                        this.dialogVisible = true
                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                this.submitRecord()
                            } else {
                                return false;
                            }
                        });
                },
             getTableData(){
                              let { taskNo }=this.$route.query
                              this.tableData=[]
                              let data={}
                                  data.taskNo=taskNo
                                  this.request('fabric_developMaterialEnter_detail',data,false).then(res=>{
                                       if(res.code==1){
                                               if(res.data){
                                                    // this.supplierMaterialColorNo=res.data.supplierMaterialColorNo
                                                    this.tableData=[res.data]
                                               }else{
                                                    this.tableData=[] 
                                               }
                                                
                                       }else{
                                                    this.$message.error(res.msg)
                                                    this.tableData=[]
                                       }
                                  })
                },
                //初始化第一个列表数据
                getData() {
                              let { taskNo }=this.$route.query
                              let data={}
                                  data.taskNo=taskNo
                        this.request('specialPricingDetail', data, false).then((res) => {
                            if(res.code==1){
                                     if(res.data){
                                           this.list=[res.data]
                                     }else{
                                           this.list       = []
                                     }
                              }else{
                                     
                                     this.list       = []
                                     this.$message.error(res.msg)
                                }
                            })    

                    },
               handleUpload(file) {
                if (!/\.jpg$|.png$|.jpe$|.bmp$|.jfif$/.test(file.name)) {
                // if (!/\.jpg$|.png$|.jpe$/.test(file.name)) {
                     this.$Message.warning('类型不符,请重新选择图片');
                     return false
                } else {
                    console.log(file)
                     this.file = file;
                     this.Filename= file.name
                     this.className=1
                     setTimeout(()=>{
                            this.$refs['upload'].post(file)
                        },1000)
                      return false;
                }
                },
                allDealsList(brandId){
                        let data={};
                        this.formSearch.plannerOaId=''
                        // this.formSearch.plannerOaId=''
                        // this.formSearch.plannerOaId=''
                        data.brandId=Number(brandId)
                        this.request('productlaunch_developDesignerConfig_plannerListInit', {data:data}, false).then((res) => {
                                if(res.code==1){
                                     this.alldealList=res.data
                                     if(res.data.length==0){
                                            // document.querySelector('.ivu-select-selected-value').innerHTML=''
                                            this.alldealList=[]
                                            //  this.$set(this.alldealList)
                                            this.formSearch.plannerOaId=''
                                     }
                                }
                            })    
                },
                uploadSuccess(res, file) {
                        if (res.code == 1) {
                            this.file = '';
                                 file='';
                                this.imgShowUrl=res.data.htmlOssAddress
                                this.materialImg=res.data.ossAddress
                            this.$Message.success({
                                content: res.msg,
                                duration: 3
                            });
                        } else {
                            this.file = '';
                                file='';
                            this.loadingStatus = false;
                            this.$Message.error({
                                content: res.msg,
                                duration: 3
                            });
                        }
                    },
               cancel(){
                        this.dialogVisible=false;
                         this.imgShowUrl=''
                        this.resetForm('ruleForm')
               },
        }       
    }
</script>

<style lang="less" scoped>
    .headerstyle,
    .main,
    .middle,
    .footer {
        width: 99%;
        margin: 0 auto;
        background: #fff;
        padding: 20px 20px 10px 20px;
        margin-bottom: 10px;
    }

    .getmore {
        padding-top: 6px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 12px;
        cursor: pointer;
    }

    .pointer {
        cursor: pointer;
    }

    .pl20 {
        padding-left: 20px
    }

    .el-table__row td {
        padding: 0;
    }

    /* 用来设置当前页面element全局table 选中某行时的背景色*/
    .el-table__body tr.current-row>td {
        background-color: #f19944 !important;
        /* color: #f19944; */
        /* 设置文字颜色，可以选择不设置 */
    }

    /* 用来设置当前页面element全局table 鼠标移入某行时的背景色*/
    .el-table--enable-row-hover .el-table__body tr:hover>td {
        background-color: #f19944;
        /* color: #f19944; */
        /* 设置文字颜色，可以选择不设置 */
    }

    .el-table__header-wrapper {

        width: 99.9% !important;

    }
   
</style>
<style>
 .el-image-viewer__close{
        color:#fff!important;
    }
.el-image-viewer__prev,.el-image-viewer__next{
     display: none;
}
</style>
