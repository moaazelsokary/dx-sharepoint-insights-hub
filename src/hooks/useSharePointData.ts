
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { sharePointService } from "@/services/sharePointService";

export const useSharePointData = (isAuthenticated: boolean) => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setIsEnabled(isAuthenticated);
  }, [isAuthenticated]);

  const lagMeasuresQuery = useQuery({
    queryKey: ['sharepoint-lag-measures'],
    queryFn: () => sharePointService.getLagMeasures(),
    enabled: isEnabled,
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 2 * 60 * 1000, // Consider data stale after 2 minutes
  });

  const leadMeasuresQuery = useQuery({
    queryKey: ['sharepoint-lead-measures'],
    queryFn: () => sharePointService.getLeadMeasures(),
    enabled: isEnabled,
    refetchInterval: 5 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
  });

  const wigMetricsQuery = useQuery({
    queryKey: ['sharepoint-wig-metrics'],
    queryFn: () => sharePointService.getWigMetrics(),
    enabled: isEnabled,
    refetchInterval: 5 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
  });

  const activityDataQuery = useQuery({
    queryKey: ['sharepoint-activity-data'],
    queryFn: () => sharePointService.getActivityData(),
    enabled: isEnabled,
    refetchInterval: 5 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
  });

  const transformLagData = (rawData: any[]) => {
    return rawData.map((item: any) => ({
      id: item['Metric ID'] || `lag-${Math.random()}`,
      name: item['Metric Name'] || 'Unknown Metric',
      value: parseFloat(item['Current Value']) || 0,
      target: parseFloat(item['Target Value']) || 0,
      trend: parseFloat(item['Trend %']) || 0,
      department: item['Department'] || 'General',
      period: item['Period'] || 'Current',
      leads: [] // Will be populated from lead measures
    }));
  };

  const transformLeadData = (rawData: any[]) => {
    return rawData.map((item: any) => ({
      id: item['Lead ID'] || `lead-${Math.random()}`,
      name: item['Lead Name'] || 'Unknown Lead',
      value: parseFloat(item['Current Value']) || 0,
      target: parseFloat(item['Target Value']) || 0,
      trend: parseFloat(item['Trend %']) || 0,
      lagId: item['Related LAG ID'] || null,
      department: item['Department'] || 'General',
      period: item['Period'] || 'Current',
    }));
  };

  const transformWigData = (rawData: any[]) => {
    return rawData.map((item: any) => ({
      id: item['WIG ID'] || `wig-${Math.random()}`,
      name: item['WIG Name'] || 'Unknown WIG',
      value: parseFloat(item['Current Value']) || 0,
      target: parseFloat(item['Target Value']) || 0,
      trend: parseFloat(item['Trend %']) || 0,
      department: item['Department'] || 'General',
      period: item['Period'] || 'Current',
    }));
  };

  const isLoading = lagMeasuresQuery.isLoading || leadMeasuresQuery.isLoading || 
                   wigMetricsQuery.isLoading || activityDataQuery.isLoading;

  const error = lagMeasuresQuery.error || leadMeasuresQuery.error || 
               wigMetricsQuery.error || activityDataQuery.error;

  const lagMeasures = lagMeasuresQuery.data ? transformLagData(lagMeasuresQuery.data) : [];
  const leadMeasures = leadMeasuresQuery.data ? transformLeadData(leadMeasuresQuery.data) : [];
  const wigMetrics = wigMetricsQuery.data ? transformWigData(wigMetricsQuery.data) : [];
  const activityData = activityDataQuery.data || [];

  // Associate lead measures with lag measures
  const enrichedLagMeasures = lagMeasures.map(lag => ({
    ...lag,
    leads: leadMeasures.filter(lead => lead.lagId === lag.id)
  }));

  return {
    lagMeasures: enrichedLagMeasures,
    leadMeasures,
    wigMetrics,
    activityData,
    isLoading,
    error,
    isConnected: isEnabled,
    refetch: () => {
      lagMeasuresQuery.refetch();
      leadMeasuresQuery.refetch();
      wigMetricsQuery.refetch();
      activityDataQuery.refetch();
    }
  };
};
