<template>
<div>
    <header class="headerstyle">
        <el-form :inline="true" :model="formData" class="demo-form-inline ">
            <div>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('查询') !== -1" size="small" type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button size="small" type="default" @click="onReset">重置</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('发起流程') !== -1" size="small" type="primary" @click="onStart">发起流程</el-button>
                </el-form-item>
                <el-form-item size="small">
                    <el-button v-if="judgeMenu.indexOf('取消流程') !== -1" size="small" type="primary" @click="onEnd">取消流程</el-button>
                </el-form-item>
            </div>
            <el-form-item label="开发任务编号" size="small">
                <el-input v-model="formData.taskCode" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="检测任务编号" size="small">
                <el-input v-model="formData.qcCheckNo" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="设计款号" size="small">
                <el-input v-model="formData.designNo" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="样品来源" size="small">
                <el-select v-model="formData.sampleSource" placeholder="样品来源" style="width:150px" filterable>
                    <el-option v-for="v in sampleSourceList" :key="v.id" :label="v.name" :value="v.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发起人" size="small">
                <el-select v-model="formData.initiateUserName" placeholder="发起人" style="width:150px" filterable>
                    <el-option  v-for="v in initiateUserNameList" :key="v.initiateUserId" :label="v.initiateUserName" :value="v.initiateUserId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="流程状态" size="small">
                <el-select v-model="formData.processStatus" placeholder="流程状态" style="width:150px" filterable>
                    <el-option v-show="v!='已完成'" v-for="v in statusList" :key="v" :label="v" :value="v"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </header>
    <section class="middle" :style="{minHeight:showBink?'690px':'480px'}">
        <el-pagination style="margin-bottom:10px;text-align:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <!-- <Table ref="currentRowTable" @on-select-cancel="choiceId" @on-select-all-cancel="choiceId" max-height='550' @on-select="choiceId" @on-select-all="choiceId" :columns="columns" size="small" highlight-row :data="list"></Table> -->
        <el-table @select-all="selectionAll" @select="selection" ref="multipleTable" :data="list" style="width: 100%" class="pointer" border tooltip-effect="dark" max-height="390" @row-click="showLog" highlight-current-row>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="55" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="taskNo" label="开发任务编号" min-width="120" align="center">
            </el-table-column>
            <el-table-column prop="qcCheckNo" label="检测任务编号" min-width="120" align="center">
            </el-table-column>
            <el-table-column prop="sampleSource" label="样品来源" min-width="120" align="center">
            </el-table-column>
            <el-table-column prop="processStatus" label="流程状态" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="initiateUserName" label="发起人" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="initiateDepartmentName" label="发起部门" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="majorClasses" label="物料类型" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="weave" label="织  法" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="kinds" label="品类分类" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="designNo" label="设计款号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="materialNo" label="物料编号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="materialName" label="物料名称" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="factoryName" label="加工厂/供应商" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="materialColor" label="物料颜色" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="supplierMaterialNo" label="供应商物料编号" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="specialCategory" label="是否特殊工艺" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.specialCategory == 1 ? '是' : '否'}}</template>
            </el-table-column>
            <el-table-column prop="specialProcessCategory" label="特殊工艺类目" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="styleImg" label="样图1" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <div v-if="scope.row.styleImg" @click="imgClick(scope.row.styleImg)">
                        <el-image style="width: 40px; height: 40px" :src="scope.row.styleImg" :preview-src-list="[scope.row.styleImg]">
                        </el-image>
                    </div>
                    <div v-if="!scope.row.styleImg">
                        <el-image style="width: 40px; height: 40px" :src="noneUrl"></el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="styleImg2" label="样图2" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <div v-if="scope.row.styleImg2" @click="imgClick(scope.row.styleImg2)">
                        <el-image style="width: 40px; height: 40px" :src="scope.row.styleImg2" :preview-src-list="[scope.row.styleImg2]">
                        </el-image>
                    </div>
                    <div v-if="!scope.row.styleImg2">
                        <el-image style="width: 40px; height: 40px" :src="noneUrl"></el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="realMaterial" label="是否有实物" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.realMaterial == 1 ? '是' : '否'}}</template>
            </el-table-column>
            <el-table-column prop="contrastColor" label="是否撞色" min-width="120" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.contrastColor == 1 ? '是' : '否'}}</template>
            </el-table-column>
            <el-table-column prop="developer" label="开发员" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="submitTime" label="提交日期" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="requireDate" label="要求完成日期" min-width="120" align="center" show-overflow-tooltip>
            </el-table-column>
        </el-table>
    </section>
    <!-- 发起流程 -->
    <Modal v-model="startVisible" @on-cancel='cancelStartForm' title="发起流程">
        <el-form :inline="true" ref="startformdata" :model="startformdata" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="startrules">
            <el-form-item label="样品来源：" prop="goodsFrom" size="small" label-width="180px">
                <el-select v-model="startformdata.goodsFrom" style="width:150px" filterable>
                    <el-option v-for="v in goodsFromList" :key="v" :label="v" :value="v"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <Button type="default" @click="cancelStartForm">取消</Button>
            <Button type="primary" @click="saveStartForm">确定</Button>
        </div>
    </Modal>
    <!-- A类开发 -->
    <Modal v-model="Avisible" @on-cancel='cancelAdevelop' title="A类开发" :width="1110">
        <el-form :inline="true" ref="formdataA" :model="aformdata" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="arules">
            <el-form-item label="设计款号" size="small" label-width="100px">
                <el-input v-model="aformdata.designNo" @blur="getFactoryList" style="width:120px" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="加工厂" prop="factory" size="small" label-width="100px">
                <el-select v-model="aformdata.factory" @change="changeFactory(aformdata.factory)" style="width:200px" filterable>
                    <el-option v-for="v in factoryList" :key="v" :label="v" :value="v"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否有实物" prop="realMaterial" size="small" label-width="100px">
                <el-select v-model="aformdata.realMaterial" style="width:100px" filterable>
                    <el-option v-for="v in yesNoList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否撞色" prop="contrastColor" size="small" label-width="100px">
                <el-select v-model="aformdata.contrastColor" style="width:100px" filterable>
                    <el-option v-for="v in yesNoList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="检测要求" size="small" label-width="100px">
                <el-input type="textarea" placeholder="请输入内容" v-model="aformdata.testRequire" :autosize="{ minRows: 5, maxRows: 6}" style="width:400px" maxlength="100" show-word-limit>
                </el-input>
            </el-form-item>
             <el-form-item label="图片" size="small" label-width="140px">
                    <div style="width: 100px; height: 100px" @click="clickImg('1')">
                        <el-image v-if="imgUrl1.length>0" style="width: 100px; height: 100px" :src="imgUrl1">
                        </el-image>
                        <el-image v-if="imgUrl1.length ==0" style="width: 100px; height: 100px" :src="noneUrl"></el-image>
                    </div>
                </el-form-item>
        </el-form>
        <Button type="primary" @click="addTable">添加</Button>
        <Button type="default" @click="deleteTable">删除</Button>
        <el-table :data="addTableList" style="width: 100%" @selection-change="handleSelectionChange" border tooltip-effect="dark" :max-height="340" size="mini">
            <el-table-column type="selection" :selectable='checkboxSelect' width="55">
            </el-table-column>
            <el-table-column type="index" width="55" fixed="left" label="序号" align="center"></el-table-column>
            <el-table-column prop="one" label="*物料类型/织法/品类分类" fixed="left" min-width="280" align="center">
                <template slot-scope="scope">
                    <el-cascader v-model="scope.row.one" ref="cascader" :disabled="scope.row.disabled" style="width:350px" size="mini" filterable placeholder="物料类型/织法/品类分类" :options="oneList" :props="optionProps"></el-cascader>
                    <span style="color:red" v-if="scope.row.one==undefined||scope.row.one==''">*</span>
                </template>
            </el-table-column>
            <el-table-column prop="color" label="*物料颜色" min-width="140" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input v-model="scope.row.color" :disabled="scope.row.disabled" placeholder="请输入" size="mini" style="width:160px"></el-input>
                    <span style="color:red" v-if="scope.row.color==undefined||scope.row.color==''">*</span>
                </template>
            </el-table-column>
            <el-table-column prop="supplier" label="*供应商" min-width="140" align="center" >
                <template slot-scope="scope">
                    <el-select v-model="scope.row.supplier" style="width:160px" size="mini" filterable>
                        <el-option v-for="v in addsupplierList" :key="v.shortName" :label="v.shortName" :value="v.id"></el-option>
                    </el-select>
                    <span style="color:red" v-if="scope.row.supplier==undefined||scope.row.supplier==''">*</span>
                </template>
            </el-table-column>
            <el-table-column prop="code" label="供应商物料编号" min-width="140" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input v-model="scope.row.code" :disabled="scope.row.disabled" placeholder="请输入" size="mini" style="width:160px"></el-input>
                </template>
            </el-table-column>
            
        </el-table>
        <div slot="footer">
            <Button type="default" @click="cancelAdevelop">取消</Button>
            <Button type="primary" @click="saveAdevelop">确定</Button>
        </div>
    </Modal>
    <!-- B类加色 -->
    <Modal v-model="Bvisible" @on-cancel='cancelColordevelop' title="B类加色" :width="1110">
        <el-form :inline="true" ref="formdataB" :model="bformdata" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="brules">
            <el-form-item label="物料编号" size="small" prop="materialNo" label-width="100px">
                <el-input v-model="bformdata.materialNo" @blur="materialNoBlue(bformdata.materialNo)" style="width:120px" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="物料类型/织法/品类分类" prop="one" size="small" label-width="180px">
                <el-cascader v-model="bformdata.one" ref="cascader" @change="getPricing()" style="width:350px" size="mini" filterable placeholder="物料类型/织法/品类分类" :options="addoneList" :props="optionProps"></el-cascader>
            </el-form-item>
            <el-form-item label="物料名称" size="small" label-width="100px">
                <el-input v-model="bformdata.materialName" style="width:180px" placeholder="请输入"></el-input>
            </el-form-item>
             <el-form-item label="供应商" prop="supplierShortName" size="small" label-width="100px">
                <el-select v-model="bformdata.supplierShortName" @change="getPricing()" style="width:200px" filterable>
                    <el-option v-for="v in supplierList" :key="v" :label="v" :value="v"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否有实物" prop="realMaterial" size="small" label-width="100px">
                <el-select v-model="bformdata.realMaterial" style="width:100px" filterable>
                    <el-option v-for="v in yesNoList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否撞色" prop="contrastColor" size="small" label-width="100px">
                <el-select v-model="bformdata.contrastColor" style="width:100px" filterable>
                    <el-option v-for="v in yesNoList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="设计款号" size="small" label-width="100px">
                <el-input v-model="bformdata.designNo" style="width:120px" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="物料颜色" prop="materialColors" size="small" label-width="100px">
                <el-select v-model="bformdata.materialColors" @change="changematerialColors(bformdata.materialColors)" style="width:150px" filterable>
                    <el-option v-for="v in colorList" :key="v.colorName" :label="v.colorName" :value="v.colorName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="供应商物料色号" prop="materialColorNo" size="small" label-width="140px">
                <el-input v-model="bformdata.materialColorNo" style="width:120px" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="是否核价" prop="pricing" size="small" label-width="100px">
                <el-select v-model="bformdata.pricing" @change="changePricing(bformdata.pricing)" style="width:100px" filterable>
                    <el-option v-for="v in yesNoList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="大货价（含税）" size="small" label-width="130px">
                <el-select v-model="bformdata.price" :disabled="pricingDisabled" style="width:150px" filterable>
                    <el-option v-for="v in priceList" :key="v" :label="v" :value="v"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="检测要求" size="small" label-width="100px">
                <el-input type="textarea" placeholder="请输入内容" v-model="bformdata.testRequire" :autosize="{ minRows: 5, maxRows: 6}" style="width:400px" maxlength="100" show-word-limit>
                </el-input>
            </el-form-item>
             <el-form-item label="图片" size="small" label-width="140px">
                    <div style="width: 100px; height: 100px" @click="clickImg('1')">
                        <el-image v-if="imgUrl1.length>0" style="width: 100px; height: 100px" :src="imgUrl1">
                        </el-image>
                        <el-image v-if="imgUrl1.length ==0" style="width: 100px; height: 100px" :src="noneUrl"></el-image>
                    </div>
                </el-form-item>
        </el-form>
        
        <div slot="footer">
            <Button type="default" @click="cancelColordevelop">取消</Button>
            <Button type="primary" @click="saveColordevelop">确定</Button>
        </div>
    </Modal>
    <!-- B类开发 -->
    <Modal v-model="visible"  title="B类开发" @on-cancel='cancel' :width="1010" @on-ok="editSubmit">
        <Row class="margin-bottom-10 background-color-white exhibition">
            <el-form :inline="true" ref="ruleForm" :model="addformdata" class="demo-form-inline demo-ruleForm " :label-position="left" :rules="rules">
                <Col span="24">
                <Col span="8">
                <el-form-item label="物料类型" prop="majorClasses" size="small" label-width="120px">
                    <el-select v-model="addformdata.majorClasses" @change="changeMajorClasses(addformdata.majorClasses)" style="width:150px" filterable>
                        <el-option v-for="v in majorClassesList" :key="v" :label="v" :value="v"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="8">
                <el-form-item label="品类分类" prop="kinds" size="small" label-width="120px">
                    <el-select v-model="addformdata.kinds" @change="changeKinds(addformdata.kinds)" style="width:150px" filterable>
                        <el-option v-for="v in kindsList" :key="v" :label="v" :value="v"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="8">
                <el-form-item label="是否有实物" prop="realMaterial" size="small" label-width="120px">
                    <el-select v-model="addformdata.realMaterial" style="width:150px" filterable>
                        <el-option v-for="v in yesNoList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                </Col>
                <Col span="24">
                <Col span="8">
                <el-form-item label="是否撞色" prop="contrastColor" size="small" label-width="120px">
                    <el-select v-model="addformdata.contrastColor" style="width:150px" filterable>
                        <el-option v-for="v in yesNoList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="8">
                <el-form-item label="是否特殊工艺" prop="specialCategory" size="small" label-width="120px">
                    <el-select v-model="addformdata.specialCategory" style="width:150px" filterable>
                        <el-option v-for="v in yesNoList" :key="v.id" :label="v.name" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="8">
                <el-form-item v-if="this.addformdata.specialCategory == 1" label="特殊工艺类目" size="small" label-width="120px">
                    <el-select v-model="addformdata.specialProcessCategory" @change="changespecialProcessCategory(addformdata.specialProcessCategory)" style="width:150px" filterable>
                        <el-option v-for="v in typeList" :key="v.specialProcessCategory" :label="v.specialProcessCategory" :value="v.specialProcessCategory"></el-option>
                    </el-select>
                    <!-- <el-input v-model="addformdata.specialCategoryType" :disabled="true" style="width:120px"></el-input> -->
                </el-form-item>
                </Col>
                </Col>
                <Col span="24">
                <Col span="8">
                <el-form-item label="开发员" prop="developer" size="small" label-width="120px">
                    <el-select v-model="addformdata.developer" @change="changeDevelop(addformdata.developer)" style="width:150px" filterable>
                        <el-option v-for="v in personList" :key="v.id" :label="v.basicUserName" :value="v.basicUserName"></el-option>
                    </el-select>
                </el-form-item>
                </Col>
                <Col span="8">
                <el-form-item label="要求完成日期" prop="requireDate" size="small" label-width="120px">
                    <DatePicker v-model="addformdata.requireDate" type="date" style="width: 150px">
                    </DatePicker>
                </el-form-item>
                <!-- data.planStockinTime = Util.dateFormat(this.formSearch.planStockinTime, 'yyyy-MM-dd'); -->
                </Col>
                </Col>
                <Col span='24'>
                <Col span="8">
                <el-form-item label="设计师需求样品图" size="small" label-width="140px">
                    <div style="width: 100px; height: 100px" @click="clickImg('1')">
                        <el-image v-if="imgUrl1.length>0" style="width: 100px; height: 100px" :src="imgUrl1">
                        </el-image>
                        <el-image v-if="imgUrl1.length ==0" style="width: 100px; height: 100px" :src="noneUrl"></el-image>
                    </div>
                </el-form-item>
                </Col>
                <Col span="8">
                <div style="width: 100px; height: 100px" @click="clickImg('2')">
                    <el-image v-if="imgUrl2.length>0" style="width: 100px; height: 100px" :src="imgUrl2"></el-image>
                    <el-image v-if="imgUrl2.length == 0" style="width: 100px; height: 100px" :src="noneUrl"></el-image>
                </div>

                </Col>
                </Col>
            </el-form>
        </Row>
        <div slot="footer">
            <Button type="default" @click="cancel">取消</Button>
            <Button type="primary" @click="submitForm('ruleForm')">确认</Button> 
        </div>
    </Modal>

    <!--上传图片-->
    <Modal v-model="picVisible" @on-cancel='cancelGood' title="上传图片">
        <div>
            <Upload ref="upload" name="file" :show-upload-list="false" :before-upload="handleUpload" :on-success="uploadSuccess" :on-error="uploadError" type="drag" action="/eop-boot/masterData/ossFileAddress/upload" :data="{className:'面料开发'}">
                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或将图片拖拽到此处</p>
                </div>
            </Upload>
            <div v-if="file !== null">{{ file.name }}
                <Button type="text" :loading="loadingStatus">{{ loadingStatus ? '上传中...' : '' }}
                </Button>
            </div>
        </div>
        <div slot="footer">
            <Button type="default" @click="cancelGood">取消</Button>
            <Button type="primary" @click="upload">确定</Button>
        </div>
    </Modal>

    <Modal title="查看大图" v-model="imgVisible">
        <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
</div>
</template>

<script>
import Util from 'libs/util'
import {
    debounce
} from 'mixins/debounce'
import {burypoint} from 'mixins/burypoint'
export default {
    mixins: [debounce,burypoint],
    data() {
        return {
            sampleSourceList:[],
            initiateUserNameList:[],
            pricingDisabled:false,
            priceList:[],
            materialNoDisabled:false,
            addoneList:[],
            factoryList:[],
            optionProps: {
                value: 'text',
                label: 'text',
                children: 'children'
            },
            oneList:[],
            addTableList:[],
            selectionList:[],
            startformdata: {},
            aformdata:{
                factory:''
            },
            bformdata:{
                one:[],
                materialName:'',
                supplierShortName:'',
                price:'',
                materialColorNo:'',
            },
            startVisible: false,
            startrules: {
                goodsFrom: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }]
            },
            arules: {
                factory: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                realMaterial: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                contrastColor: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
            },
            brules: {
                materialColorNo:[{
                    required: true,
                    message: '请输入',
                    trigger: 'blue'
                }],
                materialNo: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blue'
                }],
                one: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blue'
                }],
                supplierShortName: [{
                    required: true,
                    message: '请输入',
                    trigger: 'blue'
                }],
                realMaterial: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                contrastColor: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                materialColors: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                pricing: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
            },
            Avisible: false, //A类开发
            Bvisible: false, //B类加色
            visible: false, //B类开发
            goodsFromList: ['A类开发', 'B类加色', 'B类开发'],
            noneUrl: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562574299&di=846b4c904bd54d3c3821fa5938888c69&src=http://hbimg.b0.upaiyun.com/bdaca9a07e1a8947c00c2f826ebf848750927aa24963-cATwbg_fw658',
            getDay: '',
            userInfo: {},
            rowId: '',
            personList: [],
            typeList: [],
            kindsList: [],
            oldKindsList: [],
            getObj: {},
            majorClassesList: ['面料', '辅料'],
            yesNoList: [{
                id: '1',
                name: '是'
            }, {
                id: '0',
                name: '否'
            }],
            statusList: [], //任务状态
            imgUrl1: '',
            imgUrl2: '',
            getOssUrl1: '',
            getOssUrl2: '',
            imgType: '',
            // url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            srcList: [],
            picVisible: false,
            file: null,
            rules: {
                specialCategoryType: [{
                    required: true,
                    message: '请选择',
                    trigger: 'change'
                }],
                majorClasses: [ //面料
                    {
                        required: true,
                        message: '请选择',
                        trigger: 'change'
                    },
                ],
                kinds: [ //分类
                    {
                        required: true,
                        message: '请选择',
                        trigger: 'change'
                    },
                ],
                realMaterial: [ //是否有实物
                    {
                        required: true,
                        message: '请选择',
                        trigger: 'change'
                    },
                ],
                contrastColor: [ //是否撞色
                    {
                        required: true,
                        message: '请选择',
                        trigger: 'change'
                    },
                ],
                specialCategory: [ //是否特殊工艺
                    {
                        required: true,
                        message: '请选择',
                        trigger: 'change'
                    },
                ],
                developer: [ //开发员
                    {
                        required: true,
                        message: '请选择',
                        trigger: 'change'
                    },
                ],
                requireDate: [ //要求完成日期
                    {
                        required: true,
                        message: '请选择',
                        trigger: 'change'
                    }
                ],
            },
            imgUrl: '',

            addformdata: {
                kinds: '',
                specialProcessCategory: '',
                specialCategory: '',
            },
            colorList: [],
            page: 1,
            pageSize: 10,
            currentPage: 1,
            mystyle: {
                top: '150px',
            },
            formData: {},
            IDS: [],
            companyList: [],
            responseList: [], //负责人列表
            departmentList: [], //品牌列表
            // 日志相关
            dataFlag: true,
            logList: [], //日志列表
            billNo: '',
            currentPage: 1,
            // 日志相关
            list: [],
            judgeMenu: [],
            buttonList: [], //按钮权限
            department: {},
            developId: '',
            supplierList:[],
            addsupplierList:[],
            addSupplierName:'',
        }
    },
    mounted() {
        this.userInfo = JSON.parse(window.sessionStorage.getItem('userinfo'));
        this.getData()
        this.getStatusList()
        this.getDepartment()
        this.getButtonJurisdiction() //按钮权限    fabric_getFabricStyleTree
        this.getTreeList()
        this.getsampleSourceList()//样品来源  
        this.getInitiateUserList()
    },
    methods: {
        getInitiateUserList(){
            this.request('getInitiateUserList', {}, false).then(res => {
                if (res.code == 1) {
                    this.initiateUserNameList = res.data
                }
            })
        },
        getsampleSourceList(){
            let data = {}
            data.type = 'fabric_sample_source'
            this.request('supplier_constant', data, false).then(res => {
                if (res.code == 1) {
                    this.sampleSourceList = res.data
                }
            })
        },
        getTreeList(){
            this.request('fabric_getFabricStyleTree', {}, false).then(res => {
                if (res.code == 1) {
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
        //确认发起流程
        saveStartForm() {
            this.$refs['startformdata'].validate((valid) => {
                if (valid) {
                    if (this.startformdata.goodsFrom == 'A类开发') {
                        this.Avisible = true
                        this.setBuryPoint('发起A类开发流程')
                        this.getFactoryList()
                    } else if (this.startformdata.goodsFrom == 'B类加色') {
                        this.setBuryPoint('发起B类加色流程')
                        this.Bvisible = true //
                        // this.getColorList()
                    } else {
                        this.setBuryPoint('发起B类开发流程')
                        this.visible = true //B类开发
                        let data = {}
            this.request('queryNextId', data, true).then((res) => {
                if (res.code == 1) {
                    // this.queryNextId = 
                    this.getPersonList(res.data)
                    // this.personList = res.data
                }
                    })
                    }
                } else {
                    return false;
                }
            });
        },
        // getColorList(){
        //     this.request('fabric_getColorList', {}, true).then(res => {
        //                     if (res.code == 1) {
        //                         this.colorList = res.data
        //                     }
        //                 })
        // },
        getFactoryList(){
            this.aformdata.factory = ''
            let data = {}
            data.designNo = this.aformdata.designNo
            this.request('fabric_getFactoryByDesignNo', data, true).then(res => {
                            if (res.code == 1) {
                                this.factoryList = res.data
                            } else {
                                this.$message.error(res.msg);
                            }
                        })
        },
        //取消发起流程
        cancelStartForm() {
            this.startVisible = false
            this.startformdata = {}
            this.$refs['startformdata'].resetFields();
        },
        //获取供应商
        changeFactory(name){
            let data = {}
            data.factoryName = name
            this.request('fabric_getSupplierByFactory', data, true).then(res => {
                            if (res.code == 1) {
                                this.addsupplierList = res.data.supplierList
                                this.addSupplierName = res.data.id
                            } else {
                                this.$message.error(res.msg);
                            }
                        })
        },
        addTable() {
            if (this.addTableList.length == 0) {
                if(!this.aformdata.factory){
                    this.$message.warning('请先选择加工厂')
                }else{
                    this.addTableList.push({ //没有默认值
                    one: [],
                    supplier:this.addSupplierName
                })
                }
                
            } else {
                let allFlag = false
                this.addTableList.map((item) => {
                    if (item.one.length == 0 || !item.color || !item.supplier) {
                        return allFlag = true
                    }
                })
                if (allFlag) {
                    this.$message.warning('数据不完整！')
                } else {
                    this.addTableList.push({ //没有默认值
                        one: [],
                        supplier:this.addSupplierName
                    })
                }
            }
        },
         //选择删除的数据
        handleSelectionChange(row) {
            this.selectionList = row
        },
        //删除
        deleteTable() {
            if (this.selectionList.length == 0) {
                this.$message.warning('请先选中删除的数据')
            } else {
                this.selectionList.map((i, index) => {
                    this.addTableList.map((y, t) => {
                        if (i.one == y.one) {
                            this.addTableList.splice(t, 1)
                        }
                    })
                })
                this.$message.success('删除成功')
            }
        },
        //保存A类开发
        saveAdevelop(){
            this.$refs['formdataA'].validate((valid) => {
                if (valid) {
                    let allFlag = false
                    if(this.addTableList.length === 0){
                        this.$message.warning('请先添加明细再保存')
                    }else{
                        this.addTableList.map((item)=>{
                            if(item.one.length === 0 || item.color == '' || !item.color){
                                return allFlag = true
                            }
                        })
                        if (allFlag) {
                            this.$message.warning('数据不完整')
                        }else{
                            let list = []
                            this.addTableList.map((item)=>{
                                list.push({
                                    materialType:item.one[0],
                                    weave:item.one[1],
                                    category:item.one[2],
                                    materialColor:item.color,
                                    supplierMaterialNo:item.code,
                                    supplierId:item.supplier
                                })
                            })
                            //保存A类开发
                            let data = {}
                            data.initiateUserId = this.userInfo.userId
                            data.initiateUserName = this.userInfo.userName
                            data.realMaterial = this.aformdata.realMaterial //是否有实物
                            data.contrastColor = this.aformdata.contrastColor //是否撞色
                            data.styleImg = this.getOssUrl1 //样图1URL
                            data.initiateDepartmentId = this.department.departmentRootId
                            data.initiateDepartmentName = this.department.departmentRootName
                            data.designNo = this.aformdata.designNo //设计款号
                            data.factoryName = this.aformdata.factory //加工厂
                            data.requirements = this.aformdata.testRequire //检测要求
                            data.detailList = list
                            this.request('fabric_addAdevelop', data, true).then(res => {
                            if (res.code == 1) {
                                this.cancelStartForm()
                                this.$message.success('新增成功')
                                this.getData()
                                this.cancelAdevelop()
                            } else {
                                this.$message.error(res.msg);
                            }
                        })

                        }
                    }
                } else {
                    return false;
                }
            });
        },
        //取消A类开发
        cancelAdevelop(){
            this.Avisible = false
            this.aformdata = {
                factory:''
            }
            this.addSupplierName = ''
            this.imgUrl1 = ''
            this.imgUrl1 = ''
            this.getOssUrl1 = ''
            this.addTableList = []
            this.$refs['formdataA'].resetFields();
        },
        //物料编号
        materialNoBlue(code){
            let data = {}
            data.materialNo = code
            this.request('fabric_getInfoByNo', data, false).then(res => {
                if (res.code == 1) {
                    this.addoneList = this.deleteChildren(res.data.typeTree.children)
                    this.supplierList = res.data.supplierShortNameList
                    this.bformdata.materialName = res.data.materialName
                    this.bformdata.supplierShortName = res.data.supplierShortName
                    this.bformdata.one = [res.data.materialType,res.data.weave,res.data.category]
                    this.colorList = res.data.colors
                    this.getPricing()
                }else{
                    this.$message.warning(res.msg)
                    this.addoneList = []
                    this.supplierList = []
                    this.bformdata.materialName = ''
                    this.bformdata.supplierShortName = ''
                    this.bformdata.one = []
                    this.priceList = []
                }
            })
        },
        getPricing(){
            if(!this.bformdata.materialNo || this.bformdata.one.length == 0 || !this.bformdata.supplierShortName){
                return false
            }else{
                let data = {}
                data.materialNo = this.bformdata.materialNo
                data.supplierShortName = this.bformdata.supplierShortName
                data.materialType = this.bformdata.one[0]
                data.weave = this.bformdata.one[1]
                data.category = this.bformdata.one[2]
                this.request('fabric_getPrice', data, false).then(res => {
                if (res.code == 1) {
                    this.priceList = res.data
                }else{
                    this.priceList = []
                    this.$message.warning(res.msg)
                }
            })
            }
        },
        changematerialColors(color){
            let colorNo = ''
            this.colorList.map((item)=>{
                if(color == item.colorName){
                    colorNo = item.colorNo
                }
            })
            this.bformdata.materialColorNo = colorNo
        },
        //是否核价
        changePricing(name){
            if(name == '1'){
                this.bformdata.price = ''
                this.pricingDisabled = true
            }else{
                this.pricingDisabled = false
            }
        },
        //保存B类加色
        saveColordevelop(){
            console.log(this.bformdata.pricing == 0,this.bformdata.price === '')
            this.$refs['formdataB'].validate((valid) => {
                if (valid) {
                    let list = []
                    this.colorList.map((item)=>{
                        if(item.colorName == this.bformdata.materialColors){
                            list.push({
                                materialColor:item.colorName,
                                materialColorNo:item.colorNo
                            })
                        }
                    })
                    let data = {}
                        data.initiateUserId = this.userInfo.userId
                        data.initiateUserName = this.userInfo.userName
                        data.realMaterial = this.bformdata.realMaterial //是否有实物
                        data.contrastColor = this.bformdata.contrastColor //是否撞色
                        data.styleImg = this.getOssUrl1 //样图1URL
                        data.initiateDepartmentId = this.department.departmentRootId
                        data.initiateDepartmentName = this.department.departmentRootName
                        data.materialNo = this.bformdata.materialNo //物料编号
                        data.materialType = this.bformdata.one[0]
                        data.weave = this.bformdata.one[1]
                        data.category = this.bformdata.one[2]
                        data.materialName = this.bformdata.materialName //物料名称
                        data.supplierShortName = this.bformdata.supplierShortName //供应商
                        data.designNo = this.bformdata.designNo //设计款号
                        data.materialColors = list //物料颜色
                        data.materialColorNo = this.bformdata.materialColorNo //供应商物料色号
                        data.pricing = this.bformdata.pricing //是否核价
                        data.price = this.bformdata.price //大货价(含税)
                        data.requirements = this.bformdata.testRequire //检测要求
                        if(this.bformdata.pricing == 0 && this.bformdata.price === '')return this.$message.error('请选择大货价')
                        this.request('fabric_addBAddColor', data, false).then(res => {
                        if (res.code == 1) {
                            this.cancelStartForm()
                            this.$message.success('B类加色成功')
                            this.getData()
                            this.cancelColordevelop()
                }else{
                    this.$message.error(res.msg)
                }
            })
                    //保存B类加色
                } else {
                    return false;
                }
            });
        },
        //取消B类加色
        cancelColordevelop(){
            this.bformdata = {
                one:[],
                materialName:'',
                supplierShortName:'',
                price:'',
                materialColorNo:''
            }
            this.$refs['formdataB'].resetFields();
            this.Bvisible = false
            this.imgUrl1 = ''
            this.getOssUrl1 = ''
        },
        changeDevelop(name) {
            console.log(name)
            let id = ''
            this.personList.map(item => {
                if (name == item.basicUserName) {
                    id = item.basicUserId
                }
            })
            this.developId = id
        },
        imgClick(url) {
            this.srcList = [url]
            console.log('pppppppppppppp', this.srcList)
        },
        getDepartment() {
            let data = {}
            data.code = this.userInfo.staffCode
            this.request('masterData_staff_getDepartmentByCode', data, false).then(res => {
                if (res.code == 1) {
                    this.department = res.data
                    // this.formData2=res.data
                }
            })
        },
        changeMajorClasses(name) {
            this.addformdata.kinds = ''
            this.addformdata.specialProcessCategory = ''
            this.addformdata.specialCategory = ''
            this.kindsList = []
            this.typeList = []
            let data = {}
            data.majorClasses = name
            this.request('fabric_developCycle_select', data, true).then(res => {
                if (res.code == 1) {
                    // this.kindsList = res.data
                    let List = []
                    res.data.map(item => {
                        List.push(item.kinds)
                    });
                    this.oldKindsList = res.data
                    this.kindsList = [...new Set(List)]
                } else {
                    this.$message.error(res.msg);
                }
            })
        },
        changeKinds(name) {
            // this.kindsList = []
            this.addformdata.specialCategory = ''
            this.addformdata.specialProcessCategory = ''
            console.log(name)
            let data = {}
            data.majorClasses = this.addformdata.majorClasses
            data.kinds = name
            this.request('fabric_developCycle_select', data, true).then(res => {
                if (res.code == 1) {
                    console.log(res.data.length)
                    if (res.data.length > 0) {
                        this.typeList = res.data
                        // this.addformdata.specialCategory = '1'
                    } else {
                        // this.addformdata.specialCategory = '0'
                    }
                    // this.kindsList = res.data
                } else {
                    this.$message.error(res.msg);
                }
            })
            let obj = {}
            this.oldKindsList.map(item => {
                if (name == item.kinds) {
                    obj = item
                    console.log(item, '0000000000000000')
                }
            });
            this.getObj = obj
            // this.addformdata.specialCategoryType = code
            // if(this.addformdata.specialCategoryType.length == 0){
            //     this.addformdata.specialCategory = '0'
            // }else{
            //     this.addformdata.specialCategory = '1'
            // }
            console.log(this.getObj)
        },
        changespecialProcessCategory(name) {
            console.log(name)
            let day = ''
            this.typeList.map(item => {
                if (name == item.specialProcessCategory) {
                    day = item.specialProcessCategoryDay
                    // obj = item
                    console.log(item, '0000000000000000')
                }
            });
            this.getDay = day
        },
        clickImg(type) {
            this.imgType = type
            console.log(this.imgType)
            this.picVisible = true
            console.log('00000000000')
        },
        cancelGood() {
            this.file = null
            this.picVisible = false
        },
        upload() {
            if (this.file == null) {
                this.$message.warning('请先选择文件再导入')
            } else {
                // this.visible = false
                // 
                let data = new FormData
                data.append('file', this.file)
                data.append('className', 'initiate')
                this.request('uploadImg', data, true).then(res => {
                    if (res.code == 1) {
                        if (this.imgType == 1) {
                            this.imgUrl1 = res.data.htmlOssAddress
                            this.getOssUrl1 = res.data.ossAddress
                        } else {
                            this.imgUrl2 = res.data.htmlOssAddress
                            this.getOssUrl2 = res.data.ossAddress
                        }
                        this.picVisible = false
                        this.file = null
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            }
        },
        //上传之前img
        handleUpload(file) {
            if (!/\.jpg|.png|.jpeg|.JPG|.PNG|.JPEG/.test(file.name)) {
                this.$message.warning('文件类型不符,请重新选择文件');
                return false
            } else {
                this.file = file //需要传给后台的file文件
                this.name = file.name

            }
            return false
        },

        //上传成功之后
        uploadSuccess(res, file) {
            Vue.prototype.$loading.close();
            if (res.code == '1') {
                console.log(this.imgType)

                this.loadingStatus = false;
                this.file = null;
                this.$message.success(res.msg);
                this.picterVisible = false;
                this.imgUrlSave = res.data
            } else {
                this.loadingStatus = false;
                this.$message.error({
                    content: res.msg,
                    duration: 3
                });
            }
        },
        uploadError(res, file) {
            this.$message.error(res.msg);
        },
        submitForm() {
            if (this.getOssUrl1 == '' && this.getOssUrl2 == '') {
                this.$message.error('至少上传一张设计师需求样品图')
            } else {
                this.$refs['ruleForm'].validate((valid) => {
                    console.log(valid)
                    if (valid) { //新增保存
                        let data = Util.deepClone(this.addformdata);
                        if (this.addformdata.specialCategory == 0) {
                            data.fabricDevelopCycleSpecialDay = ''
                            data.specialProcessCategory = ''
                        } else {
                            data.fabricDevelopCycleSpecialDay = this.getDay
                        }
                        console.log(this.addformdata.specialCategory, '11111111111', this.getDay)
                        data.initiateUserId = this.userInfo.userId
                        data.initiateUserName = this.userInfo.userName
                        data.initiateDepartmentId = this.department.departmentRootId
                        data.initiateDepartmentName = this.department.departmentRootName
                        data.requireDate = Util.dateFormat(this.addformdata.requireDate, 'yyyy-MM-dd')
                        data.fabricDevelopCycleId = this.getObj.id
                        data.fabricDevelopCycleDay = this.getObj.cycleDay
                        data.styleImg = this.getOssUrl1
                        data.styleImg2 = this.getOssUrl2
                        data.developerId = this.developId
                        this.request('add_fabric', data, true).then(res => {
                            if (res.code == 1) {
                                this.startVisible = false
                                this.$message.success('新增成功')
                                this.getData()
                                this.visible = false
                                this.addformdata = {
                                    specialProcessCategory: '',
                                    kinds: '',
                                    specialCategory: ''
                                }
                                this.$refs['ruleForm'].resetFields();
                                this.imgUrl1 = ''
                                this.imgUrl2 = ''
                                this.getOssUrl1 = ''
                                this.getOssUrl2 = ''
                                this.typeList = []
                                this.kindsList = []
                            } else {
                                this.$message.error(res.msg);
                            }
                        })
                    } else { //验证表单
                        return false;
                    }
                });
            }
        },
        //取消
        cancel() {
            this.visible = false
            this.addformdata = {
                specialProcessCategory: '',
                kinds: '',
                specialCategory: ''
            }
            this.$refs['ruleForm'].resetFields();
            this.imgUrl1 = ''
            this.imgUrl2 = ''
            this.getOssUrl1 = ''
            this.getOssUrl2 = ''
            this.typeList = []
            this.kindsList = []
        },
        //发起流程
        onStart() {
            this.setBuryPoint('发起流程')
            this.startVisible = true
        },
        selection(selection, row) {
            console.log('当用户手动勾选数据行的 Checkbox 时触发的事件', selection, row)
            // 选择项大于1时
            if (selection.length > 1) {
                let del_row = selection.shift();
                this.$refs.multipleTable.toggleRowSelection(del_row, false); // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
            }
            this.rowId = row.taskNo
        },
        selectionAll(selection) {
            if (selection.length > 1) {
                selection.length = 1;
            }
        },
        //取消流程
        onEnd() {
            this.setBuryPoint('取消流程')
            // let arr = w2ui.settlementDetail.getSelection()
            let data = {};
            data.taskNo = this.rowId
            if (this.rowId) {
                this.request('cancelCheck_fabric', data, false).then((res) => {
                    if (res.code == 1) {
                        this.$confirm(res.data, '操作确认', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                        }).then(({
                            // value
                        }) => {
                            this.request('cancel_fabric', data, false).then((res) => {
                                if (res.code == 1) {
                                    this.$message.success(res.msg)
                                    this.getData()
                                } else {
                                    this.$message.error(res.msg)
                                }
                            })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            } else {
                this.$message.error('请勾选取消流程数据')
            }
        },
        //获取人员下拉
        getPersonList(id) {
            let data = {}
            data.taskConfigurationId = id
            this.request('getListByTaskConfigurationId', data, true).then((res) => {
                if (res.code == 1) {
                    this.personList = res.data
                }
            })
        },
        getButtonJurisdiction() {
            let data = {}
            data.parentResourceCode = this.$route.query.code
            this.request('masterData_resource_buttonResource', data, true).then(res => {
                if (res.code == 1) {
                    this.buttonList = res.data
                    let newList = []
                    this.buttonList.map(function (item) {
                        newList.push(item.resourceName)
                    })
                    this.judgeMenu = newList
                }
            })
        },
        getData() {
            this.logList = []
            let data = {}
            data.currentPage = this.page
            data.pageSize = this.pageSize
            data.taskNo = this.formData.taskCode
            data.qcCheckNo = this.formData.qcCheckNo
            data.designNo = this.formData.designNo
            data.sampleSourceCode = this.formData.sampleSource
            data.initiateUserId = this.formData.initiateUserName
            data.processStatus = this.formData.processStatus
            this.request('queryProcess_page', data, true).then((res) => {
                if (res.code == 1) {
                    this.list = res.data.records
                    this.total = res.data.count
                } else {
                    this.list = []
                    this.total = '0'
                }
            })
        },
        getStatusList() {
            //masterData_company_selector
            let data = {}
            this.request('queryProcessStatus', data, true).then((res) => {
                if (res.code == 1) {
                    this.statusList = res.data
                }
            })
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.getData()
        },
        handleCurrentChange(page) {
            this.page = page
            this.getData()
        },
        onSearch() {
            this.setBuryPoint('查询')
            this.page = 1;
            this.getData()
        },
        onReset() {
            this.formData = {}
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

.el-icon-circle-close {
    color: white !important;
}
</style><style>
.el-image-viewer__close {
    color: #fff !important;
}

.el-image-viewer__prev,
.el-image-viewer__next {
    display: none;
}
</style>
