export function getCommandCenterSeverity(riskLevel: number) {
  if (riskLevel <= 70) {
    return 'success';
  } else if (riskLevel <= 80) {
    return 'warning';
  } else if (riskLevel > 80) {
    return 'error';
  } else {
    return 'trivial';
  }
}
