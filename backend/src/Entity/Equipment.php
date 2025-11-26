<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\EquipmentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: EquipmentRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/equipments',
            normalizationContext: ['groups' => ['equipment:read']]
        ),
        new GetCollection(
            uriTemplate: '/admin/equipments',
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['equipment:read']]
        ),
        new Get(
            uriTemplate: '/equipments/{id}',
            normalizationContext: ['groups' => ['equipment:read']]
        ),
        new Post(
            uriTemplate: '/admin/equipments',
            security: "is_granted('ROLE_ADMIN')",
            denormalizationContext: ['groups' => ['equipment:write']]
        ),
        new Put(
            uriTemplate: '/admin/equipments/{id}',
            security: "is_granted('ROLE_ADMIN')",
            denormalizationContext: ['groups' => ['equipment:write']]
        ),
        new Delete(
            uriTemplate: '/admin/equipments/{id}',
            security: "is_granted('ROLE_ADMIN')"
        ),
    ]
)]
class Equipment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['equipment:read', 'vehicle:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Groups(['equipment:read', 'equipment:write', 'vehicle:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 50, unique: true)]
    #[Groups(['equipment:read', 'equipment:write', 'vehicle:read'])]
    private ?string $code = null;

    #[ORM\Column(length: 10)]
    #[Groups(['equipment:read', 'equipment:write', 'vehicle:read'])]
    private ?string $icon = null;

    #[ORM\ManyToMany(targetEntity: Vehicle::class, mappedBy: 'equipments')]
    private Collection $vehicles;

    public function __construct()
    {
        $this->vehicles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

        return $this;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function setIcon(string $icon): static
    {
        $this->icon = $icon;

        return $this;
    }

    /**
     * @return Collection<int, Vehicle>
     */
    public function getVehicles(): Collection
    {
        return $this->vehicles;
    }

    public function addVehicle(Vehicle $vehicle): static
    {
        if (!$this->vehicles->contains($vehicle)) {
            $this->vehicles->add($vehicle);
            $vehicle->addEquipment($this);
        }

        return $this;
    }

    public function removeVehicle(Vehicle $vehicle): static
    {
        if ($this->vehicles->removeElement($vehicle)) {
            $vehicle->removeEquipment($this);
        }

        return $this;
    }
}


