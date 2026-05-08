import { describe, expect, it } from 'vitest';
import { buildNoRm, createPatientVisit, nextQueueNumber, parseList } from './clinicalWorkflow';

describe('clinical workflow domain', () => {
  it('parses comma-separated JSONB allergy input', () => {
    expect(parseList('Lateks, Penisilin,  ')).toEqual(['Lateks', 'Penisilin']);
  });

  it('generates stable medical record numbers', () => {
    expect(buildNoRm(2, 2026)).toBe('RM-2026-0003');
  });

  it('creates patient and visit records with uuid-compatible ids', () => {
    const result = createPatientVisit({
      patientCount: 2,
      visits: [{ kodePoli: 'UMUM', nomorAntrian: 4 }],
      form: {
        nik: '3273010705260004',
        namaLengkap: 'Dewi Kartika',
        tanggalLahir: '1996-02-14',
        kodePoli: 'UMUM',
        alergi: 'Lateks',
        tekananDarah: '118/78',
        suhu: '36.6',
        nadi: '79',
      },
      now: new Date('2026-05-07T09:15:00'),
      uuid: () => '00000000-0000-4000-8000-000000000001',
    });

    expect(result.patient.noRm).toBe('RM-2026-0003');
    expect(result.patient.riwayatAlergi).toEqual(['Lateks']);
    expect(result.visit.nomorAntrian).toBe(5);
    expect(result.visit.status).toBe('MENUNGGU');
  });

  it('computes next queue number per clinic code', () => {
    expect(
      nextQueueNumber([
        { kodePoli: 'UMUM', nomorAntrian: 7 },
        { kodePoli: 'GIGI', nomorAntrian: 2 },
      ], 'UMUM'),
    ).toBe(8);
  });
});
