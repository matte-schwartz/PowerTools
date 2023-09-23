import { Fragment } from "react";
import { Component } from "react";
import {
    ToggleField,
    SliderField,
    PanelSectionRow,
    staticClasses,
    Field,
    Dropdown,
    SingleDropdownOption,
} from "decky-frontend-lib";
import * as backend from "../backend";
import { tr } from "usdpl-front";
import { LIMITS_INFO, SLOW_PPT_GPU, FAST_PPT_GPU } from "../consts";
import { set_value, get_value } from "usdpl-front";

const PRESET_MODE_GPU = {
    silent: {
        tdp: 10,
        ppt_slow: SLOW_PPT_GPU,
        ppt_fast: SLOW_PPT_GPU,
    },
    performance: {
        tdp: 15,
        ppt_slow: SLOW_PPT_GPU,
        ppt_fast: FAST_PPT_GPU,
    },
    turbo25: {
        tdp: 25,
        ppt_slow: SLOW_PPT_GPU,
        ppt_fast: FAST_PPT_GPU,
    },
    turbo30: {
        tdp: 30,
        ppt_slow: SLOW_PPT_GPU,
        ppt_fast: FAST_PPT_GPU,
    },
    custom: {
        tdp: get_value("gpu_tdp"),
        ppt_slow: get_value("gpu_ppt_slow"),
        ppt_fast: get_value("gpu_ppt_fast"),
    },
    "Performance 20W": {
        tdp: 20,
        ppt_slow: SLOW_PPT_GPU,
        ppt_fast: FAST_PPT_GPU,
    },
    "40W Overdrive": {
        tdp: 40,
        ppt_slow: 45,
        ppt_fast: 53,
    },
};

export class Gpu extends Component {
    handlePerformanceChange = (value: number) => {
        switch (value) {
            case 0:
                set_value("gpu_tdp", PRESET_MODE_GPU.silent.tdp);
                set_value("gpu_ppt_slow", PRESET_MODE_GPU.silent.ppt_slow);
                set_value("gpu_ppt_fast", PRESET_MODE_GPU.silent.ppt_fast);
                break;
            case 1:
                set_value("gpu_tdp", PRESET_MODE_GPU.performance.tdp);
                set_value("gpu_ppt_slow", PRESET_MODE_GPU.performance.ppt_slow);
                set_value("gpu_ppt_fast", PRESET_MODE_GPU.performance.ppt_fast);
                break;
            case 2:
                set_value("gpu_tdp", PRESET_MODE_GPU.turbo25.tdp);
                set_value("gpu_ppt_slow", PRESET_MODE_GPU.turbo25.ppt_slow);
                set_value("gpu_ppt_fast", PRESET_MODE_GPU.turbo25.ppt_fast);
                break;
            case 3:
                set_value("gpu_tdp", PRESET_MODE_GPU.turbo30.tdp);
                set_value("gpu_ppt_slow", PRESET_MODE_GPU.turbo30.ppt_slow);
                set_value("gpu_ppt_fast", PRESET_MODE_GPU.turbo30.ppt_fast);
                break;
            case 4:
                set_value("gpu_tdp", PRESET_MODE_GPU.custom.tdp);
                set_value("gpu_ppt_slow", PRESET_MODE_GPU.custom.ppt_slow);
                set_value("gpu_ppt_fast", PRESET_MODE_GPU.custom.ppt_fast);
                break;
            case 5:
                set_value("gpu_tdp", PRESET_MODE_GPU["Performance 20W"].tdp);
                set_value("gpu_ppt_slow", PRESET_MODE_GPU["Performance 20W"].ppt_slow);
                set_value("gpu_ppt_fast", PRESET_MODE_GPU["Performance 20W"].ppt_fast);
                break;
            case 6:
                set_value("gpu_tdp", PRESET_MODE_GPU["40W Overdrive"].tdp);
                set_value("gpu_ppt_slow", PRESET_MODE_GPU["40W Overdrive"].ppt_slow);
                set_value("gpu_ppt_fast", PRESET_MODE_GPU["40W Overdrive"].ppt_fast);
                break;
        }
    };

    render() {
        const reloadGUI = (x: string) => this.setState({ reloadThingy: x });

        const performanceDropdown: SingleDropdownOption[] = [
            { data: 0, label: <span>Silent 10W</span> },
            { data: 1, label: <span>Peformance 15W</span> },
            { data: 5, label: <span>Performance 20W</span> },
            { data: 2, label: <span>Turbo 25W</span> },
            { data: 3, label: <span>Turbo 30W</span> },
            { data: 4, label: <span>Manual</span> },
            { data: 6, label: <span>40W Overdrive</span> },
        ];

        const labels: string[] = [
            "Silent 10W",
            "Performance 15W",
            "Turbo 25W",
            "Turbo 30W",
            "Manual",
            "Performance 20W",
            "40W Overdrive",
        ];

        return (
            <Fragment>
                {/* GPU */}
                <div className={staticClasses.PanelSectionTitle}>
                    {tr("GPU")}
                </div>
                <PanelSectionRow>
                    <ToggleField
                        label={tr("Enable GPU Tuning")}
                        field={backend.gpu_tuning_enabled}
                    />
                </PanelSectionRow>
                <PanelSectionRow>
                    <Field label={tr("TDP Limit (W)")}>
                        <SliderField
                            field={backend.gpu_tdp}
                            min={10}
                            max={LIMITS_INFO.gpu_tdp_max}
                            step={1}
                            marks={{
                                10: 10,
                                [LIMITS_INFO.gpu_tdp_max]: LIMITS_INFO.gpu_tdp_max,
                            }}
                        />
                    </Field>
                </PanelSectionRow>
                <PanelSectionRow>
                    <Field label={tr("Performance Preset")} className={staticClasses.w100}>
                        <Dropdown
                            value={get_value("gpu_preset")}
                            onChange={this.handlePerformanceChange}
                        >
                            {performanceDropdown.map((option, index) => (
                                <SingleDropdownOption
                                    key={option.data}
                                    value={option.data}
                                    label={option.label}
                                />
                            ))}
                        </Dropdown>
                    </Field>
                </PanelSectionRow>
                <PanelSectionRow>
                    <Field label={tr("Slow PPT Limit (W)")}>
                        <SliderField
                            field={backend.gpu_ppt_slow}
                            min={SLOW_PPT_GPU}
                            max={FAST_PPT_GPU}
                            step={1}
                            marks={{
                                [SLOW_PPT_GPU]: SLOW_PPT_GPU,
                                [FAST_PPT_GPU]: FAST_PPT_GPU,
                            }}
                        />
                    </Field>
                </PanelSectionRow>
                <PanelSectionRow>
                    <Field label={tr("Fast PPT Limit (W)")}>
                        <SliderField
                            field={backend.gpu_ppt_fast}
                            min={SLOW_PPT_GPU}
                            max={FAST_PPT_GPU}
                            step={1}
                            marks={{
                                [SLOW_PPT_GPU]: SLOW_PPT_GPU,
                                [FAST_PPT_GPU]: FAST_PPT_GPU,
                            }}
                        />
                    </Field>
                </PanelSectionRow>
            </Fragment>
        );
    }
}