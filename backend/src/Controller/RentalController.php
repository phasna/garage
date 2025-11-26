<?php

namespace App\Controller;

use App\Repository\RentalRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class RentalController extends AbstractController
{
    #[Route('/vehicles/{id}/availability', name: 'vehicle_availability', methods: ['GET'])]
    public function checkAvailability(
        int $id,
        Request $request,
        RentalRepository $rentalRepository
    ): JsonResponse {
        $startDate = $request->query->get('start');
        $endDate = $request->query->get('end');

        if (!$startDate || !$endDate) {
            return $this->json([
                'error' => 'Les paramètres start et end sont requis'
            ], 400);
        }

        try {
            $start = new \DateTime($startDate);
            $end = new \DateTime($endDate);
        } catch (\Exception $e) {
            return $this->json([
                'error' => 'Format de date invalide. Utilisez YYYY-MM-DD'
            ], 400);
        }

        if ($start >= $end) {
            return $this->json([
                'error' => 'La date de début doit être antérieure à la date de fin'
            ], 400);
        }

        $isAvailable = $rentalRepository->isVehicleAvailableForPeriod($id, $start, $end);

        return $this->json([
            'vehicleId' => $id,
            'startDate' => $startDate,
            'endDate' => $endDate,
            'available' => $isAvailable
        ]);
    }

    #[Route('/vehicles/{id}/rentals', name: 'vehicle_rentals', methods: ['GET'])]
    public function getVehicleRentals(
        int $id,
        RentalRepository $rentalRepository
    ): JsonResponse {
        $rentals = $rentalRepository->findActiveRentalsByVehicle($id);

        $data = array_map(function ($rental) {
            return [
                'startDate' => $rental->getStartDate()->format('Y-m-d'),
                'endDate' => $rental->getEndDate()->format('Y-m-d'),
            ];
        }, $rentals);

        return $this->json($data);
    }
}

