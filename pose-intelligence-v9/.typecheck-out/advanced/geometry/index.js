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
exports.trail_ankle_knee_59 = exports.trail_ankle_knee_39 = exports.trail_ankle_knee_19 = exports.right_shoulder_hip_plane_65 = exports.right_shoulder_hip_plane_45 = exports.right_shoulder_hip_plane_25 = exports.right_shoulder_hip_plane_05 = exports.left_shoulder_hip_plane_64 = exports.left_shoulder_hip_plane_44 = exports.left_shoulder_hip_plane_24 = exports.left_shoulder_hip_plane_04 = exports.lead_wrist_elbow_54 = exports.lead_wrist_elbow_34 = exports.lead_wrist_elbow_14 = exports.lead_shoulder_pelvis_50 = exports.lead_shoulder_pelvis_30 = exports.lead_shoulder_pelvis_10 = exports.lead_leg_chain_62 = exports.lead_leg_chain_42 = exports.lead_leg_chain_22 = exports.lead_leg_chain_02 = exports.lead_knee_pelvis_56 = exports.lead_knee_pelvis_36 = exports.lead_knee_pelvis_16 = exports.lead_elbow_torso_52 = exports.lead_elbow_torso_32 = exports.lead_elbow_torso_12 = exports.lead_arm_structure_60 = exports.lead_arm_structure_40 = exports.lead_arm_structure_20 = exports.lead_arm_structure_00 = exports.lead_ankle_knee_58 = exports.lead_ankle_knee_38 = exports.lead_ankle_knee_18 = exports.head_to_shoulders_68 = exports.head_to_shoulders_48 = exports.head_to_shoulders_28 = exports.head_to_shoulders_08 = exports.head_to_hips_69 = exports.head_to_hips_49 = exports.head_to_hips_29 = exports.head_to_hips_09 = exports.hand_to_pelvis_right_67 = exports.hand_to_pelvis_right_47 = exports.hand_to_pelvis_right_27 = exports.hand_to_pelvis_right_07 = exports.hand_to_pelvis_66 = exports.hand_to_pelvis_46 = exports.hand_to_pelvis_26 = exports.hand_to_pelvis_06 = void 0;
exports.trail_wrist_elbow_55 = exports.trail_wrist_elbow_35 = exports.trail_wrist_elbow_15 = exports.trail_shoulder_pelvis_51 = exports.trail_shoulder_pelvis_31 = exports.trail_shoulder_pelvis_11 = exports.trail_leg_chain_63 = exports.trail_leg_chain_43 = exports.trail_leg_chain_23 = exports.trail_leg_chain_03 = exports.trail_knee_pelvis_57 = exports.trail_knee_pelvis_37 = exports.trail_knee_pelvis_17 = exports.trail_elbow_torso_53 = exports.trail_elbow_torso_33 = exports.trail_elbow_torso_13 = exports.trail_arm_structure_61 = exports.trail_arm_structure_41 = exports.trail_arm_structure_21 = exports.trail_arm_structure_01 = void 0;
exports.hand_to_pelvis_06 = __importStar(require("./hand_to_pelvis_06"));
exports.hand_to_pelvis_26 = __importStar(require("./hand_to_pelvis_26"));
exports.hand_to_pelvis_46 = __importStar(require("./hand_to_pelvis_46"));
exports.hand_to_pelvis_66 = __importStar(require("./hand_to_pelvis_66"));
exports.hand_to_pelvis_right_07 = __importStar(require("./hand_to_pelvis_right_07"));
exports.hand_to_pelvis_right_27 = __importStar(require("./hand_to_pelvis_right_27"));
exports.hand_to_pelvis_right_47 = __importStar(require("./hand_to_pelvis_right_47"));
exports.hand_to_pelvis_right_67 = __importStar(require("./hand_to_pelvis_right_67"));
exports.head_to_hips_09 = __importStar(require("./head_to_hips_09"));
exports.head_to_hips_29 = __importStar(require("./head_to_hips_29"));
exports.head_to_hips_49 = __importStar(require("./head_to_hips_49"));
exports.head_to_hips_69 = __importStar(require("./head_to_hips_69"));
exports.head_to_shoulders_08 = __importStar(require("./head_to_shoulders_08"));
exports.head_to_shoulders_28 = __importStar(require("./head_to_shoulders_28"));
exports.head_to_shoulders_48 = __importStar(require("./head_to_shoulders_48"));
exports.head_to_shoulders_68 = __importStar(require("./head_to_shoulders_68"));
exports.lead_ankle_knee_18 = __importStar(require("./lead_ankle_knee_18"));
exports.lead_ankle_knee_38 = __importStar(require("./lead_ankle_knee_38"));
exports.lead_ankle_knee_58 = __importStar(require("./lead_ankle_knee_58"));
exports.lead_arm_structure_00 = __importStar(require("./lead_arm_structure_00"));
exports.lead_arm_structure_20 = __importStar(require("./lead_arm_structure_20"));
exports.lead_arm_structure_40 = __importStar(require("./lead_arm_structure_40"));
exports.lead_arm_structure_60 = __importStar(require("./lead_arm_structure_60"));
exports.lead_elbow_torso_12 = __importStar(require("./lead_elbow_torso_12"));
exports.lead_elbow_torso_32 = __importStar(require("./lead_elbow_torso_32"));
exports.lead_elbow_torso_52 = __importStar(require("./lead_elbow_torso_52"));
exports.lead_knee_pelvis_16 = __importStar(require("./lead_knee_pelvis_16"));
exports.lead_knee_pelvis_36 = __importStar(require("./lead_knee_pelvis_36"));
exports.lead_knee_pelvis_56 = __importStar(require("./lead_knee_pelvis_56"));
exports.lead_leg_chain_02 = __importStar(require("./lead_leg_chain_02"));
exports.lead_leg_chain_22 = __importStar(require("./lead_leg_chain_22"));
exports.lead_leg_chain_42 = __importStar(require("./lead_leg_chain_42"));
exports.lead_leg_chain_62 = __importStar(require("./lead_leg_chain_62"));
exports.lead_shoulder_pelvis_10 = __importStar(require("./lead_shoulder_pelvis_10"));
exports.lead_shoulder_pelvis_30 = __importStar(require("./lead_shoulder_pelvis_30"));
exports.lead_shoulder_pelvis_50 = __importStar(require("./lead_shoulder_pelvis_50"));
exports.lead_wrist_elbow_14 = __importStar(require("./lead_wrist_elbow_14"));
exports.lead_wrist_elbow_34 = __importStar(require("./lead_wrist_elbow_34"));
exports.lead_wrist_elbow_54 = __importStar(require("./lead_wrist_elbow_54"));
exports.left_shoulder_hip_plane_04 = __importStar(require("./left_shoulder_hip_plane_04"));
exports.left_shoulder_hip_plane_24 = __importStar(require("./left_shoulder_hip_plane_24"));
exports.left_shoulder_hip_plane_44 = __importStar(require("./left_shoulder_hip_plane_44"));
exports.left_shoulder_hip_plane_64 = __importStar(require("./left_shoulder_hip_plane_64"));
exports.right_shoulder_hip_plane_05 = __importStar(require("./right_shoulder_hip_plane_05"));
exports.right_shoulder_hip_plane_25 = __importStar(require("./right_shoulder_hip_plane_25"));
exports.right_shoulder_hip_plane_45 = __importStar(require("./right_shoulder_hip_plane_45"));
exports.right_shoulder_hip_plane_65 = __importStar(require("./right_shoulder_hip_plane_65"));
exports.trail_ankle_knee_19 = __importStar(require("./trail_ankle_knee_19"));
exports.trail_ankle_knee_39 = __importStar(require("./trail_ankle_knee_39"));
exports.trail_ankle_knee_59 = __importStar(require("./trail_ankle_knee_59"));
exports.trail_arm_structure_01 = __importStar(require("./trail_arm_structure_01"));
exports.trail_arm_structure_21 = __importStar(require("./trail_arm_structure_21"));
exports.trail_arm_structure_41 = __importStar(require("./trail_arm_structure_41"));
exports.trail_arm_structure_61 = __importStar(require("./trail_arm_structure_61"));
exports.trail_elbow_torso_13 = __importStar(require("./trail_elbow_torso_13"));
exports.trail_elbow_torso_33 = __importStar(require("./trail_elbow_torso_33"));
exports.trail_elbow_torso_53 = __importStar(require("./trail_elbow_torso_53"));
exports.trail_knee_pelvis_17 = __importStar(require("./trail_knee_pelvis_17"));
exports.trail_knee_pelvis_37 = __importStar(require("./trail_knee_pelvis_37"));
exports.trail_knee_pelvis_57 = __importStar(require("./trail_knee_pelvis_57"));
exports.trail_leg_chain_03 = __importStar(require("./trail_leg_chain_03"));
exports.trail_leg_chain_23 = __importStar(require("./trail_leg_chain_23"));
exports.trail_leg_chain_43 = __importStar(require("./trail_leg_chain_43"));
exports.trail_leg_chain_63 = __importStar(require("./trail_leg_chain_63"));
exports.trail_shoulder_pelvis_11 = __importStar(require("./trail_shoulder_pelvis_11"));
exports.trail_shoulder_pelvis_31 = __importStar(require("./trail_shoulder_pelvis_31"));
exports.trail_shoulder_pelvis_51 = __importStar(require("./trail_shoulder_pelvis_51"));
exports.trail_wrist_elbow_15 = __importStar(require("./trail_wrist_elbow_15"));
exports.trail_wrist_elbow_35 = __importStar(require("./trail_wrist_elbow_35"));
exports.trail_wrist_elbow_55 = __importStar(require("./trail_wrist_elbow_55"));
