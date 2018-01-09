package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A WidgetImpl.
 */
@Entity
@Table(name = "widget_impl")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class WidgetImpl implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 100)
    @Column(name = "db_tipo", length = 100)
    private String dbTipo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDbTipo() {
        return dbTipo;
    }

    public WidgetImpl dbTipo(String dbTipo) {
        this.dbTipo = dbTipo;
        return this;
    }

    public void setDbTipo(String dbTipo) {
        this.dbTipo = dbTipo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        WidgetImpl widgetImpl = (WidgetImpl) o;
        if (widgetImpl.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), widgetImpl.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WidgetImpl{" +
            "id=" + getId() +
            ", dbTipo='" + getDbTipo() + "'" +
            "}";
    }
}
