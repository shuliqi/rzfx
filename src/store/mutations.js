export default ({
    //示例
    user(state, name) {
        state.name = name
    },
    module(state, module) {
        state.module.series = module.series
        state.module.name = module.name
        state.module.time = module.time
    },
    selected(state, selected) {
        state.selected = selected
    },
    bar(state, data) {
        state.bar.xAxis = data.xAxis
        state.bar.yAxis = data.yAxis
    },
    table(state, data) {
        state.table = data
    }
})