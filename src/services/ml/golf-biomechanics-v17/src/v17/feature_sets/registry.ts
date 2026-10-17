import { PoseFrame, Handedness } from '../../types';
import { compute0 } from './rotation/000_pelvis_rotation_0';
import { compute1 } from './rotation/001_pelvis_rotation_1';
import { compute2 } from './rotation/002_thorax_rotation_0';
import { compute3 } from './rotation/003_thorax_rotation_1';
import { compute4 } from './rotation/004_leadShoulder_rotation_0';
import { compute5 } from './rotation/005_leadShoulder_rotation_1';
import { compute6 } from './rotation/006_trailShoulder_rotation_0';
import { compute7 } from './rotation/007_trailShoulder_rotation_1';
import { compute8 } from './rotation/008_pelvisThorax_rotation_0';
import { compute9 } from './rotation/009_pelvisThorax_rotation_1';
import { compute10 } from './stability/010_head_stability_0';
import { compute11 } from './stability/011_head_stability_1';
import { compute12 } from './stability/012_pelvis_stability_0';
import { compute13 } from './stability/013_pelvis_stability_1';
import { compute14 } from './stability/014_thorax_stability_0';
import { compute15 } from './stability/015_thorax_stability_1';
import { compute16 } from './stability/016_leadKnee_stability_0';
import { compute17 } from './stability/017_leadKnee_stability_1';
import { compute18 } from './stability/018_trailKnee_stability_0';
import { compute19 } from './stability/019_trailKnee_stability_1';
import { compute20 } from './stability/020_leadAnkle_stability_0';
import { compute21 } from './stability/021_leadAnkle_stability_1';
import { compute22 } from './stability/022_trailAnkle_stability_0';
import { compute23 } from './stability/023_trailAnkle_stability_1';
import { compute24 } from './mobility/024_thorax_mobility_0';
import { compute25 } from './mobility/025_thorax_mobility_1';
import { compute26 } from './mobility/026_hip_mobility_0';
import { compute27 } from './mobility/027_hip_mobility_1';
import { compute28 } from './mobility/028_ankle_mobility_0';
import { compute29 } from './mobility/029_ankle_mobility_1';
import { compute30 } from './mobility/030_shoulder_mobility_0';
import { compute31 } from './mobility/031_shoulder_mobility_1';
import { compute32 } from './mobility/032_wrist_mobility_0';
import { compute33 } from './mobility/033_wrist_mobility_1';
import { compute34 } from './coordination/034_pelvisThorax_coordination_0';
import { compute35 } from './coordination/035_pelvisThorax_coordination_1';
import { compute36 } from './coordination/036_thoraxArm_coordination_0';
import { compute37 } from './coordination/037_thoraxArm_coordination_1';
import { compute38 } from './coordination/038_armClub_coordination_0';
import { compute39 } from './coordination/039_armClub_coordination_1';
import { compute40 } from './coordination/040_handClub_coordination_0';
import { compute41 } from './coordination/041_handClub_coordination_1';
import { compute42 } from './coordination/042_kneeHip_coordination_0';
import { compute43 } from './coordination/043_kneeHip_coordination_1';
import { compute44 } from './coordination/044_footHip_coordination_0';
import { compute45 } from './coordination/045_footHip_coordination_1';
import { compute46 } from './impact/046_shaft_impact_0';
import { compute47 } from './impact/047_shaft_impact_1';
import { compute48 } from './impact/048_club_impact_0';
import { compute49 } from './impact/049_club_impact_1';
import { compute50 } from './impact/050_wrist_impact_0';
import { compute51 } from './impact/051_wrist_impact_1';
import { compute52 } from './impact/052_leadHip_impact_0';
import { compute53 } from './impact/053_leadHip_impact_1';
import { compute54 } from './impact/054_leadKnee_impact_0';
import { compute55 } from './impact/055_leadKnee_impact_1';
import { compute56 } from './impact/056_lowPoint_impact_0';
import { compute57 } from './impact/057_lowPoint_impact_1';
import { compute58 } from './impact/058_attack_impact_0';
import { compute59 } from './impact/059_attack_impact_1';
import { compute60 } from './posture/060_spine_posture_0';
import { compute61 } from './posture/061_spine_posture_1';
import { compute62 } from './posture/062_pelvis_posture_0';
import { compute63 } from './posture/063_pelvis_posture_1';
import { compute64 } from './posture/064_thorax_posture_0';
import { compute65 } from './posture/065_thorax_posture_1';
import { compute66 } from './posture/066_head_posture_0';
import { compute67 } from './posture/067_head_posture_1';
import { compute68 } from './posture/068_knee_posture_0';
import { compute69 } from './posture/069_knee_posture_1';
import { compute70 } from './pressure/070_trailFoot_pressure_0';
import { compute71 } from './pressure/071_trailFoot_pressure_1';
import { compute72 } from './pressure/072_leadFoot_pressure_0';
import { compute73 } from './pressure/073_leadFoot_pressure_1';
import { compute74 } from './pressure/074_massCenter_pressure_0';
import { compute75 } from './pressure/075_massCenter_pressure_1';
import { compute76 } from './pressure/076_support_pressure_0';
import { compute77 } from './pressure/077_support_pressure_1';
import { compute78 } from './pressure/078_leadSide_pressure_0';
import { compute79 } from './pressure/079_leadSide_pressure_1';
import { compute80 } from './consistency/080_tempo_consistency_0';
import { compute81 } from './consistency/081_tempo_consistency_1';
import { compute82 } from './consistency/082_phase_consistency_0';
import { compute83 } from './consistency/083_phase_consistency_1';
import { compute84 } from './consistency/084_path_consistency_0';
import { compute85 } from './consistency/085_path_consistency_1';
import { compute86 } from './consistency/086_face_consistency_0';
import { compute87 } from './consistency/087_face_consistency_1';
import { compute88 } from './consistency/088_contact_consistency_0';
import { compute89 } from './consistency/089_contact_consistency_1';
import { compute90 } from './consistency/090_sequence_consistency_0';
import { compute91 } from './consistency/091_sequence_consistency_1';
import { compute92 } from './consistency/092_balance_consistency_0';
import { compute93 } from './consistency/093_balance_consistency_1';
import { compute94 } from './consistency/094_sway_consistency_0';
import { compute95 } from './consistency/095_sway_consistency_1';
import { compute96 } from './symmetry/096_shoulder_symmetry_0';
import { compute97 } from './symmetry/097_shoulder_symmetry_1';
import { compute98 } from './symmetry/098_hip_symmetry_0';
import { compute99 } from './symmetry/099_hip_symmetry_1';
import { compute100 } from './symmetry/100_knee_symmetry_0';
import { compute101 } from './symmetry/101_knee_symmetry_1';
import { compute102 } from './symmetry/102_ankle_symmetry_0';
import { compute103 } from './symmetry/103_ankle_symmetry_1';
import { compute104 } from './symmetry/104_elbow_symmetry_0';
import { compute105 } from './symmetry/105_elbow_symmetry_1';
import { compute106 } from './symmetry/106_wrist_symmetry_0';
import { compute107 } from './symmetry/107_wrist_symmetry_1';
import { compute108 } from './economy/108_head_economy_0';
import { compute109 } from './economy/109_head_economy_1';
import { compute110 } from './economy/110_pelvis_economy_0';
import { compute111 } from './economy/111_pelvis_economy_1';
import { compute112 } from './economy/112_thorax_economy_0';
import { compute113 } from './economy/113_thorax_economy_1';
import { compute114 } from './economy/114_arms_economy_0';
import { compute115 } from './economy/115_arms_economy_1';
import { compute116 } from './economy/116_club_economy_0';
import { compute117 } from './economy/117_club_economy_1';
export interface FeatureRegistration { id:number; name:string; family:string; run:(frames:PoseFrame[],h:Handedness)=>unknown; }
export interface RegisteredFeatureResult { id:number; name:string; family:string; result:unknown; }
export const V17_FEATURE_REGISTRY:FeatureRegistration[]=[
  { id:0, name:'pelvis', family:'rotation', run:(frames:PoseFrame[], h:Handedness)=>compute0(frames,h) },
  { id:1, name:'pelvis', family:'rotation', run:(frames:PoseFrame[], h:Handedness)=>compute1(frames,h) },
  { id:2, name:'thorax', family:'rotation', run:(frames:PoseFrame[], h:Handedness)=>compute2(frames,h) },
  { id:3, name:'thorax', family:'rotation', run:(frames:PoseFrame[], h:Handedness)=>compute3(frames,h) },
  { id:4, name:'leadShoulder', family:'rotation', run:(frames:PoseFrame[], h:Handedness)=>compute4(frames,h) },
  { id:5, name:'leadShoulder', family:'rotation', run:(frames:PoseFrame[], h:Handedness)=>compute5(frames,h) },
  { id:6, name:'trailShoulder', family:'rotation', run:(frames:PoseFrame[], h:Handedness)=>compute6(frames,h) },
  { id:7, name:'trailShoulder', family:'rotation', run:(frames:PoseFrame[], h:Handedness)=>compute7(frames,h) },
  { id:8, name:'pelvisThorax', family:'rotation', run:(frames:PoseFrame[], h:Handedness)=>compute8(frames,h) },
  { id:9, name:'pelvisThorax', family:'rotation', run:(frames:PoseFrame[], h:Handedness)=>compute9(frames,h) },
  { id:10, name:'head', family:'stability', run:(frames:PoseFrame[], h:Handedness)=>compute10(frames,h) },
  { id:11, name:'head', family:'stability', run:(frames:PoseFrame[], h:Handedness)=>compute11(frames,h) },
  { id:12, name:'pelvis', family:'stability', run:(frames:PoseFrame[], h:Handedness)=>compute12(frames,h) },
  { id:13, name:'pelvis', family:'stability', run:(frames:PoseFrame[], h:Handedness)=>compute13(frames,h) },
  { id:14, name:'thorax', family:'stability', run:(frames:PoseFrame[], h:Handedness)=>compute14(frames,h) },
  { id:15, name:'thorax', family:'stability', run:(frames:PoseFrame[], h:Handedness)=>compute15(frames,h) },
  { id:16, name:'leadKnee', family:'stability', run:(frames:PoseFrame[], h:Handedness)=>compute16(frames,h) },
  { id:17, name:'leadKnee', family:'stability', run:(frames:PoseFrame[], h:Handedness)=>compute17(frames,h) },
  { id:18, name:'trailKnee', family:'stability', run:(frames:PoseFrame[], h:Handedness)=>compute18(frames,h) },
  { id:19, name:'trailKnee', family:'stability', run:(frames:PoseFrame[], h:Handedness)=>compute19(frames,h) },
  { id:20, name:'leadAnkle', family:'stability', run:(frames:PoseFrame[], h:Handedness)=>compute20(frames,h) },
  { id:21, name:'leadAnkle', family:'stability', run:(frames:PoseFrame[], h:Handedness)=>compute21(frames,h) },
  { id:22, name:'trailAnkle', family:'stability', run:(frames:PoseFrame[], h:Handedness)=>compute22(frames,h) },
  { id:23, name:'trailAnkle', family:'stability', run:(frames:PoseFrame[], h:Handedness)=>compute23(frames,h) },
  { id:24, name:'thorax', family:'mobility', run:(frames:PoseFrame[], h:Handedness)=>compute24(frames,h) },
  { id:25, name:'thorax', family:'mobility', run:(frames:PoseFrame[], h:Handedness)=>compute25(frames,h) },
  { id:26, name:'hip', family:'mobility', run:(frames:PoseFrame[], h:Handedness)=>compute26(frames,h) },
  { id:27, name:'hip', family:'mobility', run:(frames:PoseFrame[], h:Handedness)=>compute27(frames,h) },
  { id:28, name:'ankle', family:'mobility', run:(frames:PoseFrame[], h:Handedness)=>compute28(frames,h) },
  { id:29, name:'ankle', family:'mobility', run:(frames:PoseFrame[], h:Handedness)=>compute29(frames,h) },
  { id:30, name:'shoulder', family:'mobility', run:(frames:PoseFrame[], h:Handedness)=>compute30(frames,h) },
  { id:31, name:'shoulder', family:'mobility', run:(frames:PoseFrame[], h:Handedness)=>compute31(frames,h) },
  { id:32, name:'wrist', family:'mobility', run:(frames:PoseFrame[], h:Handedness)=>compute32(frames,h) },
  { id:33, name:'wrist', family:'mobility', run:(frames:PoseFrame[], h:Handedness)=>compute33(frames,h) },
  { id:34, name:'pelvisThorax', family:'coordination', run:(frames:PoseFrame[], h:Handedness)=>compute34(frames,h) },
  { id:35, name:'pelvisThorax', family:'coordination', run:(frames:PoseFrame[], h:Handedness)=>compute35(frames,h) },
  { id:36, name:'thoraxArm', family:'coordination', run:(frames:PoseFrame[], h:Handedness)=>compute36(frames,h) },
  { id:37, name:'thoraxArm', family:'coordination', run:(frames:PoseFrame[], h:Handedness)=>compute37(frames,h) },
  { id:38, name:'armClub', family:'coordination', run:(frames:PoseFrame[], h:Handedness)=>compute38(frames,h) },
  { id:39, name:'armClub', family:'coordination', run:(frames:PoseFrame[], h:Handedness)=>compute39(frames,h) },
  { id:40, name:'handClub', family:'coordination', run:(frames:PoseFrame[], h:Handedness)=>compute40(frames,h) },
  { id:41, name:'handClub', family:'coordination', run:(frames:PoseFrame[], h:Handedness)=>compute41(frames,h) },
  { id:42, name:'kneeHip', family:'coordination', run:(frames:PoseFrame[], h:Handedness)=>compute42(frames,h) },
  { id:43, name:'kneeHip', family:'coordination', run:(frames:PoseFrame[], h:Handedness)=>compute43(frames,h) },
  { id:44, name:'footHip', family:'coordination', run:(frames:PoseFrame[], h:Handedness)=>compute44(frames,h) },
  { id:45, name:'footHip', family:'coordination', run:(frames:PoseFrame[], h:Handedness)=>compute45(frames,h) },
  { id:46, name:'shaft', family:'impact', run:(frames:PoseFrame[], h:Handedness)=>compute46(frames,h) },
  { id:47, name:'shaft', family:'impact', run:(frames:PoseFrame[], h:Handedness)=>compute47(frames,h) },
  { id:48, name:'club', family:'impact', run:(frames:PoseFrame[], h:Handedness)=>compute48(frames,h) },
  { id:49, name:'club', family:'impact', run:(frames:PoseFrame[], h:Handedness)=>compute49(frames,h) },
  { id:50, name:'wrist', family:'impact', run:(frames:PoseFrame[], h:Handedness)=>compute50(frames,h) },
  { id:51, name:'wrist', family:'impact', run:(frames:PoseFrame[], h:Handedness)=>compute51(frames,h) },
  { id:52, name:'leadHip', family:'impact', run:(frames:PoseFrame[], h:Handedness)=>compute52(frames,h) },
  { id:53, name:'leadHip', family:'impact', run:(frames:PoseFrame[], h:Handedness)=>compute53(frames,h) },
  { id:54, name:'leadKnee', family:'impact', run:(frames:PoseFrame[], h:Handedness)=>compute54(frames,h) },
  { id:55, name:'leadKnee', family:'impact', run:(frames:PoseFrame[], h:Handedness)=>compute55(frames,h) },
  { id:56, name:'lowPoint', family:'impact', run:(frames:PoseFrame[], h:Handedness)=>compute56(frames,h) },
  { id:57, name:'lowPoint', family:'impact', run:(frames:PoseFrame[], h:Handedness)=>compute57(frames,h) },
  { id:58, name:'attack', family:'impact', run:(frames:PoseFrame[], h:Handedness)=>compute58(frames,h) },
  { id:59, name:'attack', family:'impact', run:(frames:PoseFrame[], h:Handedness)=>compute59(frames,h) },
  { id:60, name:'spine', family:'posture', run:(frames:PoseFrame[], h:Handedness)=>compute60(frames,h) },
  { id:61, name:'spine', family:'posture', run:(frames:PoseFrame[], h:Handedness)=>compute61(frames,h) },
  { id:62, name:'pelvis', family:'posture', run:(frames:PoseFrame[], h:Handedness)=>compute62(frames,h) },
  { id:63, name:'pelvis', family:'posture', run:(frames:PoseFrame[], h:Handedness)=>compute63(frames,h) },
  { id:64, name:'thorax', family:'posture', run:(frames:PoseFrame[], h:Handedness)=>compute64(frames,h) },
  { id:65, name:'thorax', family:'posture', run:(frames:PoseFrame[], h:Handedness)=>compute65(frames,h) },
  { id:66, name:'head', family:'posture', run:(frames:PoseFrame[], h:Handedness)=>compute66(frames,h) },
  { id:67, name:'head', family:'posture', run:(frames:PoseFrame[], h:Handedness)=>compute67(frames,h) },
  { id:68, name:'knee', family:'posture', run:(frames:PoseFrame[], h:Handedness)=>compute68(frames,h) },
  { id:69, name:'knee', family:'posture', run:(frames:PoseFrame[], h:Handedness)=>compute69(frames,h) },
  { id:70, name:'trailFoot', family:'pressure', run:(frames:PoseFrame[], h:Handedness)=>compute70(frames,h) },
  { id:71, name:'trailFoot', family:'pressure', run:(frames:PoseFrame[], h:Handedness)=>compute71(frames,h) },
  { id:72, name:'leadFoot', family:'pressure', run:(frames:PoseFrame[], h:Handedness)=>compute72(frames,h) },
  { id:73, name:'leadFoot', family:'pressure', run:(frames:PoseFrame[], h:Handedness)=>compute73(frames,h) },
  { id:74, name:'massCenter', family:'pressure', run:(frames:PoseFrame[], h:Handedness)=>compute74(frames,h) },
  { id:75, name:'massCenter', family:'pressure', run:(frames:PoseFrame[], h:Handedness)=>compute75(frames,h) },
  { id:76, name:'support', family:'pressure', run:(frames:PoseFrame[], h:Handedness)=>compute76(frames,h) },
  { id:77, name:'support', family:'pressure', run:(frames:PoseFrame[], h:Handedness)=>compute77(frames,h) },
  { id:78, name:'leadSide', family:'pressure', run:(frames:PoseFrame[], h:Handedness)=>compute78(frames,h) },
  { id:79, name:'leadSide', family:'pressure', run:(frames:PoseFrame[], h:Handedness)=>compute79(frames,h) },
  { id:80, name:'tempo', family:'consistency', run:(frames:PoseFrame[], h:Handedness)=>compute80(frames,h) },
  { id:81, name:'tempo', family:'consistency', run:(frames:PoseFrame[], h:Handedness)=>compute81(frames,h) },
  { id:82, name:'phase', family:'consistency', run:(frames:PoseFrame[], h:Handedness)=>compute82(frames,h) },
  { id:83, name:'phase', family:'consistency', run:(frames:PoseFrame[], h:Handedness)=>compute83(frames,h) },
  { id:84, name:'path', family:'consistency', run:(frames:PoseFrame[], h:Handedness)=>compute84(frames,h) },
  { id:85, name:'path', family:'consistency', run:(frames:PoseFrame[], h:Handedness)=>compute85(frames,h) },
  { id:86, name:'face', family:'consistency', run:(frames:PoseFrame[], h:Handedness)=>compute86(frames,h) },
  { id:87, name:'face', family:'consistency', run:(frames:PoseFrame[], h:Handedness)=>compute87(frames,h) },
  { id:88, name:'contact', family:'consistency', run:(frames:PoseFrame[], h:Handedness)=>compute88(frames,h) },
  { id:89, name:'contact', family:'consistency', run:(frames:PoseFrame[], h:Handedness)=>compute89(frames,h) },
  { id:90, name:'sequence', family:'consistency', run:(frames:PoseFrame[], h:Handedness)=>compute90(frames,h) },
  { id:91, name:'sequence', family:'consistency', run:(frames:PoseFrame[], h:Handedness)=>compute91(frames,h) },
  { id:92, name:'balance', family:'consistency', run:(frames:PoseFrame[], h:Handedness)=>compute92(frames,h) },
  { id:93, name:'balance', family:'consistency', run:(frames:PoseFrame[], h:Handedness)=>compute93(frames,h) },
  { id:94, name:'sway', family:'consistency', run:(frames:PoseFrame[], h:Handedness)=>compute94(frames,h) },
  { id:95, name:'sway', family:'consistency', run:(frames:PoseFrame[], h:Handedness)=>compute95(frames,h) },
  { id:96, name:'shoulder', family:'symmetry', run:(frames:PoseFrame[], h:Handedness)=>compute96(frames,h) },
  { id:97, name:'shoulder', family:'symmetry', run:(frames:PoseFrame[], h:Handedness)=>compute97(frames,h) },
  { id:98, name:'hip', family:'symmetry', run:(frames:PoseFrame[], h:Handedness)=>compute98(frames,h) },
  { id:99, name:'hip', family:'symmetry', run:(frames:PoseFrame[], h:Handedness)=>compute99(frames,h) },
  { id:100, name:'knee', family:'symmetry', run:(frames:PoseFrame[], h:Handedness)=>compute100(frames,h) },
  { id:101, name:'knee', family:'symmetry', run:(frames:PoseFrame[], h:Handedness)=>compute101(frames,h) },
  { id:102, name:'ankle', family:'symmetry', run:(frames:PoseFrame[], h:Handedness)=>compute102(frames,h) },
  { id:103, name:'ankle', family:'symmetry', run:(frames:PoseFrame[], h:Handedness)=>compute103(frames,h) },
  { id:104, name:'elbow', family:'symmetry', run:(frames:PoseFrame[], h:Handedness)=>compute104(frames,h) },
  { id:105, name:'elbow', family:'symmetry', run:(frames:PoseFrame[], h:Handedness)=>compute105(frames,h) },
  { id:106, name:'wrist', family:'symmetry', run:(frames:PoseFrame[], h:Handedness)=>compute106(frames,h) },
  { id:107, name:'wrist', family:'symmetry', run:(frames:PoseFrame[], h:Handedness)=>compute107(frames,h) },
  { id:108, name:'head', family:'economy', run:(frames:PoseFrame[], h:Handedness)=>compute108(frames,h) },
  { id:109, name:'head', family:'economy', run:(frames:PoseFrame[], h:Handedness)=>compute109(frames,h) },
  { id:110, name:'pelvis', family:'economy', run:(frames:PoseFrame[], h:Handedness)=>compute110(frames,h) },
  { id:111, name:'pelvis', family:'economy', run:(frames:PoseFrame[], h:Handedness)=>compute111(frames,h) },
  { id:112, name:'thorax', family:'economy', run:(frames:PoseFrame[], h:Handedness)=>compute112(frames,h) },
  { id:113, name:'thorax', family:'economy', run:(frames:PoseFrame[], h:Handedness)=>compute113(frames,h) },
  { id:114, name:'arms', family:'economy', run:(frames:PoseFrame[], h:Handedness)=>compute114(frames,h) },
  { id:115, name:'arms', family:'economy', run:(frames:PoseFrame[], h:Handedness)=>compute115(frames,h) },
  { id:116, name:'club', family:'economy', run:(frames:PoseFrame[], h:Handedness)=>compute116(frames,h) },
  { id:117, name:'club', family:'economy', run:(frames:PoseFrame[], h:Handedness)=>compute117(frames,h) },
];
export function runRegisteredFeatures(frames:PoseFrame[], h:Handedness):RegisteredFeatureResult[]{return V17_FEATURE_REGISTRY.map(({id,name,family,run})=>({id,name,family,result:run(frames,h)}));}
