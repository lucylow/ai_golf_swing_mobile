"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.club_path_curvature = exports.club_acceleration_proxy = exports.club_speed_proxy = exports.grip_height_proxy = exports.torso_tilt_variability = exports.head_turn_proxy = exports.trail_elbow_fold = exports.lead_elbow_persistence = exports.arm_structure = exports.shoulder_turn_range = exports.pressure_shift_proxy = exports.pelvis_rotation_range = exports.hip_depth = exports.trail_knee_release = exports.lead_knee_extension = exports.vertical_motion = exports.center_of_mass_proxy = exports.pelvis_sway = exports.ankle_stability = exports.finish_balance = exports.impact_window_stability = exports.transition_pause = exports.tempo_variability = exports.tempo_ratio = exports.downswing_duration = exports.backswing_duration = exports.arc_height_proxy = exports.hand_path_width = exports.shaft_pitch_proxy = exports.club_plane_consistency = exports.head_centered_at_impact = exports.delivery_width = exports.low_point_proxy = exports.impact_handle_forward = exports.impact_shoulder_opening = exports.impact_pelvis_opening = exports.lead_wrist_flatness = exports.kinematic_sequence_gap = exports.arm_velocity_peak = exports.thorax_velocity_peak = exports.pelvis_velocity_peak = exports.wrist_lag_proxy = exports.shoulder_timing = exports.hip_leads_transition = exports.hip_shoulder_separation = exports.stance_width = exports.knee_flex = exports.pelvis_centering = exports.head_stability = exports.setup_spine_tilt = void 0;
exports.wedge_distance_control = exports.bunker_entry_proxy = exports.chip_low_point_proxy = exports.putt_face_stability = exports.carry_consistency_proxy = exports.spin_axis_proxy = exports.launch_window_proxy = exports.shot_start_direction_proxy = exports.face_to_path_proxy = exports.club_release_proxy = exports.club_delivery_direction = void 0;
exports.setup_spine_tilt = __importStar(require("./posture/setup_spine_tilt"));
exports.head_stability = __importStar(require("./posture/head_stability"));
exports.pelvis_centering = __importStar(require("./posture/pelvis_centering"));
exports.knee_flex = __importStar(require("./posture/knee_flex"));
exports.stance_width = __importStar(require("./posture/stance_width"));
exports.hip_shoulder_separation = __importStar(require("./posture/hip_shoulder_separation"));
exports.hip_leads_transition = __importStar(require("./sequence/hip_leads_transition"));
exports.shoulder_timing = __importStar(require("./sequence/shoulder_timing"));
exports.wrist_lag_proxy = __importStar(require("./sequence/wrist_lag_proxy"));
exports.pelvis_velocity_peak = __importStar(require("./sequence/pelvis_velocity_peak"));
exports.thorax_velocity_peak = __importStar(require("./sequence/thorax_velocity_peak"));
exports.arm_velocity_peak = __importStar(require("./sequence/arm_velocity_peak"));
exports.kinematic_sequence_gap = __importStar(require("./sequence/kinematic_sequence_gap"));
exports.lead_wrist_flatness = __importStar(require("./impact/lead_wrist_flatness"));
exports.impact_pelvis_opening = __importStar(require("./impact/impact_pelvis_opening"));
exports.impact_shoulder_opening = __importStar(require("./impact/impact_shoulder_opening"));
exports.impact_handle_forward = __importStar(require("./impact/impact_handle_forward"));
exports.low_point_proxy = __importStar(require("./impact/low_point_proxy"));
exports.delivery_width = __importStar(require("./impact/delivery_width"));
exports.head_centered_at_impact = __importStar(require("./impact/head_centered_at_impact"));
exports.club_plane_consistency = __importStar(require("./swing_plane/club_plane_consistency"));
exports.shaft_pitch_proxy = __importStar(require("./swing_plane/shaft_pitch_proxy"));
exports.hand_path_width = __importStar(require("./swing_plane/hand_path_width"));
exports.arc_height_proxy = __importStar(require("./swing_plane/arc_height_proxy"));
exports.backswing_duration = __importStar(require("./tempo/backswing_duration"));
exports.downswing_duration = __importStar(require("./tempo/downswing_duration"));
exports.tempo_ratio = __importStar(require("./tempo/tempo_ratio"));
exports.tempo_variability = __importStar(require("./tempo/tempo_variability"));
exports.transition_pause = __importStar(require("./tempo/transition_pause"));
exports.impact_window_stability = __importStar(require("./tempo/impact_window_stability"));
exports.finish_balance = __importStar(require("./balance/finish_balance"));
exports.ankle_stability = __importStar(require("./balance/ankle_stability"));
exports.pelvis_sway = __importStar(require("./balance/pelvis_sway"));
exports.center_of_mass_proxy = __importStar(require("./balance/center_of_mass_proxy"));
exports.vertical_motion = __importStar(require("./balance/vertical_motion"));
exports.lead_knee_extension = __importStar(require("./lower_body/lead_knee_extension"));
exports.trail_knee_release = __importStar(require("./lower_body/trail_knee_release"));
exports.hip_depth = __importStar(require("./lower_body/hip_depth"));
exports.pelvis_rotation_range = __importStar(require("./lower_body/pelvis_rotation_range"));
exports.pressure_shift_proxy = __importStar(require("./lower_body/pressure_shift_proxy"));
exports.shoulder_turn_range = __importStar(require("./upper_body/shoulder_turn_range"));
exports.arm_structure = __importStar(require("./upper_body/arm_structure"));
exports.lead_elbow_persistence = __importStar(require("./upper_body/lead_elbow_persistence"));
exports.trail_elbow_fold = __importStar(require("./upper_body/trail_elbow_fold"));
exports.head_turn_proxy = __importStar(require("./upper_body/head_turn_proxy"));
exports.torso_tilt_variability = __importStar(require("./upper_body/torso_tilt_variability"));
exports.grip_height_proxy = __importStar(require("./club/grip_height_proxy"));
exports.club_speed_proxy = __importStar(require("./club/club_speed_proxy"));
exports.club_acceleration_proxy = __importStar(require("./club/club_acceleration_proxy"));
exports.club_path_curvature = __importStar(require("./club/club_path_curvature"));
exports.club_delivery_direction = __importStar(require("./club/club_delivery_direction"));
exports.club_release_proxy = __importStar(require("./club/club_release_proxy"));
exports.face_to_path_proxy = __importStar(require("./shot/face_to_path_proxy"));
exports.shot_start_direction_proxy = __importStar(require("./shot/shot_start_direction_proxy"));
exports.launch_window_proxy = __importStar(require("./shot/launch_window_proxy"));
exports.spin_axis_proxy = __importStar(require("./shot/spin_axis_proxy"));
exports.carry_consistency_proxy = __importStar(require("./shot/carry_consistency_proxy"));
exports.putt_face_stability = __importStar(require("./short_game/putt_face_stability"));
exports.chip_low_point_proxy = __importStar(require("./short_game/chip_low_point_proxy"));
exports.bunker_entry_proxy = __importStar(require("./short_game/bunker_entry_proxy"));
exports.wedge_distance_control = __importStar(require("./short_game/wedge_distance_control"));
