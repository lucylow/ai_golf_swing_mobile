import React, { useMemo } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { MOCK_GOLFERS, PRIMARY_GOLFER } from '../src/fixtures/golfers';
import { MOCK_SHOTS } from '../src/fixtures/shots';
import { GolfFeatureEngineV7 } from '../src/engine/GolfFeatureEngineV7';
import type { GolfSession } from '../src/types';
import { GolfFeatureCard } from '../ui/GolfFeatureCard';
import { ShotShapeChart } from '../ui/ShotShapeChart';
import { ClubGapTable } from '../ui/ClubGapTable';
import { StrategyCard } from '../ui/StrategyCard';
import { PracticeBlockList } from '../ui/PracticeBlockList';
const engine = new GolfFeatureEngineV7();
export default function GolfCommandCenterV7() {
  const session: GolfSession = useMemo(() => ({ id:'v7-command', golferId:PRIMARY_GOLFER.id, startedAt:new Date().toISOString(), clubId:MOCK_SHOTS[0].clubId, shots:MOCK_SHOTS.slice(0,12), insights:[], practiceBlocks:[] }), []);
  const snapshot = useMemo(() => engine.analyze(PRIMARY_GOLFER, session, []), [session]);
  return <ScrollView contentContainerStyle={{ backgroundColor:'#08110E', padding:20, paddingBottom:40 }}>
    <Text style={{ color:'#B7FF3C', fontSize:11, letterSpacing:1.5, fontWeight:'800' }}>GOLF INTELLIGENCE V7</Text>
    <Text style={{ color:'#F5F8F4', fontSize:31, fontWeight:'900', marginTop:8 }}>Golf Command Center</Text>
    <Text style={{ color:'#91A29A', fontSize:14, lineHeight:20, marginTop:8, marginBottom:16 }}>One golf-specific intelligence snapshot spanning swing, ball flight, equipment, strategy and practice.</Text>
    <GolfFeatureCard label="A.I. coaching focus" value={snapshot.coach.recommendation.primarySkill.replace(/-/g,' ')} detail={snapshot.coach.recommendation.headline} accent />
    <GolfFeatureCard label="First-shot flight" value={`${Math.round(snapshot.firstFlight.carryYards)} yd carry`} detail={`${snapshot.firstShape.shape} · ${Math.round(snapshot.firstFlight.apexYards)} yd apex`} />
    <ShotShapeChart startDeg={snapshot.firstShape.startingDirectionDeg} curvatureDeg={snapshot.firstShape.curvatureDeg} label="Shot shape" />
    <View style={{ height:12 }} />
    <ClubGapTable data={snapshot.gaps} />
    <StrategyCard club={snapshot.clubChoices[0]?.name ?? '7 Iron'} target={snapshot.strategy.targetWindows[0]?.centerYards ?? 165} risk={snapshot.teeRisk.risk} reason={snapshot.strategy.targetWindows[0]?.reason ?? 'Use the highest-percentage window.'} />
    <View style={{ height:12 }} />
    <GolfFeatureCard label="Decision model" value={snapshot.decision.label} detail={snapshot.decision.explanation} />
    <GolfFeatureCard label="Expected score" value={snapshot.expectedScore.strokes.toFixed(2)} detail={`Illustrative interval ${snapshot.expectedScore.interval[0].toFixed(2)}–${snapshot.expectedScore.interval[1].toFixed(2)}`} />
    <GolfFeatureCard label="Putting start line" value={`${snapshot.putting.startLine.faceErrorDeg.toFixed(2)}°`} detail={snapshot.putting.startLine.cue} />
    <GolfFeatureCard label="Wedge decision" value={`${snapshot.wedgeRecommendation.swingLength.replace(/-/g,' ')}`} detail={`${Math.round(snapshot.wedgeRecommendation.targetCarry)} yd target · ${snapshot.wedgeRecommendation.cue}`} />
    <GolfFeatureCard label="Short-game window" value={`${Math.round(snapshot.shortGame.totalYards)} yd total`} detail={snapshot.shortGame.cue} />
    <GolfFeatureCard label="Bunker plan" value={`${snapshot.bunker.entryBehindBallIn.toFixed(1)} in entry`} detail={snapshot.bunker.cue} />
    <Text style={{ color:'#F5F8F4', fontSize:18, fontWeight:'800', marginTop:8, marginBottom:10 }}>AI practice plan</Text>
    <PracticeBlockList blocks={snapshot.practice} />
    <Text style={{ color:'#91A29A', fontSize:11, marginTop:10 }}>Illustrative product intelligence. Production values should be validated against your actual pose, launch-monitor and golf-performance data.</Text>
  </ScrollView>;
}

