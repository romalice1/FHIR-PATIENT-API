import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Patients')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Root entry' })
  getHello(): string {
    return this.appService.getHello();
  }

  // Gets all patients from FHIR API, with with no restriction. https://hapi.fhir.org/baseR4/Patient
  @Get('patients/all')
  @ApiOperation({ summary: 'Get all patients' })
  async getAllPatients() {
    const response = await fetch(
      `http://hapi.fhir.org/baseR4/Patient?_pretty=true`,
    );
    return response.json();
  }

  // Gets all patients from FHIR API, with an enforced 'limit' parameter.
  @Get('patients/limit/:limit')
  @ApiOperation({ summary: 'Get all patients with records limit' })
  async getPatients(@Param('limit') limit: number) {
    const response = await fetch(
      `http://hapi.fhir.org/baseR4/Patient?_pretty=true&_limit=${limit}`,
    );
    return response.json();
  }

  // Gets patient by ID from for instance https://hapi.fhir.org/baseR4/Patient/12345
  @Get('patients/id/:patient_id')
  @ApiOperation({ summary: 'Get patient by ID' })
  async getPatientById(@Param('patient_id') patient_id: string) {
    const response = await fetch(
      `https://hapi.fhir.org/baseR4/Patient/${patient_id}`,
    );
    return response.json();
  }
}
