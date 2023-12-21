<template>
    <div class="modal fade" id="chatFormUI">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Form UI</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <el-form :model="form" label-width="120px" :size="large">
                        <el-select v-model="value" filterable placeholder="Select">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                        <el-form-item label="Activity name">
                            <el-input v-model="form.name" :class="form-control"/>
                        </el-form-item>
                        <el-form-item label="Activity zone">
                            <el-select v-model="form.region" placeholder="please select your zone">
                                <el-option label="Zone one" value="shanghai" />
                                <el-option label="Zone two" value="beijing" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Activity time">
                            <el-col :span="11">
                                <el-date-picker
                                    v-model="form.date1"
                                    type="date"
                                    placeholder="Pick a date"
                                    style="width: 100%"
                                />
                            </el-col>
                            <el-col :span="2" class="text-center">
                                <span class="text-gray-500">-</span>
                            </el-col>
                            <el-col :span="11">
                                <el-time-picker
                                    v-model="form.date2"
                                    placeholder="Pick a time"
                                    style="width: 100%"
                                />
                            </el-col>
                        </el-form-item>
                        <el-form-item label="Instant delivery">
                            <el-switch v-model="form.delivery" />
                        </el-form-item>
                        <el-form-item label="Activity type">
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox label="Online activities" name="type" />
                                <el-checkbox label="Promotion activities" name="type" />
                                <el-checkbox label="Offline activities" name="type" />
                                <el-checkbox label="Simple brand exposure" name="type" />
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="Resources">
                            <el-radio-group v-model="form.resource">
                                <el-radio label="Sponsor" />
                                <el-radio label="Venue" />
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="Activity form">
                            <el-input v-model="form.desc" type="textarea" />
                        </el-form-item>
                        <!-- <el-form-item>
                            <el-button type="primary" @click="onSubmit">Create</el-button>
                            <el-button>Cancel</el-button>
                        </el-form-item> -->
                    </el-form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>

    
</template>

<script>
import { reactive } from "vue"
export default {
    setup() {
        const form = reactive({
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
        })

        const onSubmit = () => {
            console.log('submit!')
        }

        return {
            form,
            onSubmit,
            options: [{
                value: 'Option1',
                label: 'Option1',
            },
            {
                value: 'Option2',
                label: 'Option2',
            },
            {
                value: 'Option3',
                label: 'Option3',
            },
            {
                value: 'Option4',
                label: 'Option4',
            },
            {
                value: 'Option5',
                label: 'Option5',
            },]
        }
    }
};
</script>
<style>
</style>