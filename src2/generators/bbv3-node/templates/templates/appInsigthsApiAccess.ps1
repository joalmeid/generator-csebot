Param (

 [Alias('rg')]
 [Parameter(Mandatory=$true)]
 [String] $ResourceGroup,

 [Alias('ai')]
 [Parameter(Mandatory=$true)]
 [String] $ApplicationInsightsName,

 [Alias('apikey')]
 [Parameter(Mandatory=$true)]
 [String] $ApplicationInsightsApiKeyName,

 [Alias('permissions')]
 [Parameter(Mandatory=$false)]
 [Array] $ApiKeyPermissions
)


try
{
    $aiPermissions = @("ReadTelemetry", "WriteAnnotations", "AuthenticateSDKControlChannel");

    # App Insights Api Access
    $telemetryKeys = Get-AzureRmApplicationInsightsApiKey -ResourceGroupName $ResourceGroup -Name $ApplicationInsightsName | where {$_.Description -match $ApplicationInsightsApiKeyName };

    if( $telemetryKeys.Length -eq 0 ) {
        $apiKey = New-AzureRmApplicationInsightsApiKey -ResourceGroupName $ResourceGroup -Name $ApplicationInsightsName -Description $ApplicationInsightsApiKeyName -Permissions $aiPermissions;
        Write-Debug "Created ApiKey $($apiKey.Id) with Description $($apiKey.Description) and key $($apiKey.ApiKey)";
        # return $apiKey.ApiKey;
    }
    else { 
        Write-Debug "Telemetry key found. Deleting/Recreating new one to get apiKey"; 

        $result = Remove-AzureRmApplicationInsightsApiKey -ResourceGroupName $ResourceGroup -Name $ApplicationInsightsName -ApiKeyId $telemetryKeys[0].Id -PassThru;
        if($result) {
            Write-Debug "Removed Apikey with id $($telemetryKeys[0].Id) and Description $($telemetryKeys[0].Description).";
    
            $apiKey = New-AzureRmApplicationInsightsApiKey -ResourceGroupName $ResourceGroup -Name $ApplicationInsightsName -Description $ApplicationInsightsApiKeyName -Permissions $aiPermissions;
            Write-Debug "Created ApiKey $($apiKey.Id) with Description $($apiKey.Description) and key $($apiKey.ApiKey).";
        } else { throw "Unable to remove Apikey with id $($telemetryKeys[0].Id)"; }
    } 

    return $apiKey.ApiKey;
}
catch
{
    throw
}

